import { cell, type Cell } from './cell';
import { deepEquals, omit } from './utils';
import type {
	CanNotCreateSessionResponse,
	ErrorResponse,
	InitSessionRequest,
	InSessionResponse,
	JoinSessionRequest,
	LeaveSessionRequest,
	MessageResponse,
	MsgRequest,
	NotInSessionResponse,
	NotPairedResponse,
	SessionEndResponse,
	SessionFullResponse,
	SuccessfullyPairedResponse
} from './ws-interfaces';

type Request = InitSessionRequest | LeaveSessionRequest | JoinSessionRequest | MsgRequest;
type Response =
	| InSessionResponse
	| NotInSessionResponse
	| CanNotCreateSessionResponse
	| SessionEndResponse
	| ErrorResponse
	| SuccessfullyPairedResponse
	| SessionFullResponse
	| NotPairedResponse
	| MessageResponse;

type WithRevision<D> = D & { revision: number };

type Message<D extends Record<string, any>, E extends Record<string, any>> =
	| {
			purpose: 'heartbeat';
			data: WithRevision<D>;
	  }
	| {
			purpose: 'event';
			name: keyof E;
			detail: E[keyof E];
	  };

const WS_SERVER_URL = 'wss://quantum-be.dsrod.cz/qbit';
const HEARTBEAT_DELAY = 1_000;

export class Connection<D extends Record<string, any>, E extends Record<string, any>> {
	socket!: WebSocket;
	private heartbeatInterval = -1;
	private lastAgreedUponData: WithRevision<D>;
	private revision = 0;
	private role: 'founder' | 'joiner' = 'joiner';
	private eventListeners: { [K in keyof E]?: Set<(detail: E[K]) => void> } = {};

	sessionId = cell<number | undefined>(undefined);
	open = cell(false);
	state = cell<'not-in-session' | 'not-paired' | 'paired'>('not-in-session');
	lastHeartbeat = cell(0);
	data: Cell<D>;

	constructor(initialData: D) {
		// set up data
		this.data = cell(initialData);
		this.lastAgreedUponData = { ...initialData, revision: -1 };
		this.data.subscribe(this.onDataChanged);

		// create socket
		this.createSocket();

		// make available from dev console
		(window as any).connection = this;
	}

	destroy() {
		this.data.unsubscribe(this.onDataChanged);
		this.socket.removeEventListener('open', this.onOpen);
		this.socket.removeEventListener('close', this.onClose);
		this.socket.removeEventListener('message', this.onSocketMsg);
		this.sendRequest({ message: 'leave-session' });
		this.socket.close();
	}

	// Various event listeners

	private onDataChanged = (d: D) => {
		this.revision += 1;
	};
	private onOpen = () => {
		// once the socket opens, marks it as open and starts a heartbeat message
		console.log('Connected!');

		this.open.value = true;
		this.heartbeatInterval = setInterval(
			() =>
				this.sendMessage({
					purpose: 'heartbeat',
					data: { ...this.data.value, revision: this.revision }
				}),
			HEARTBEAT_DELAY
		);
	};
	private onClose = () => {
		// once the socket closes, update app state and try to reconnect
		console.log('Disconnected!');

		this.open.value = false;
		this.sessionId.value = undefined;
		this.state.value = 'not-in-session';

		clearInterval(this.heartbeatInterval);
		this.createSocket();
	};
	private onSocketMsg = (e: MessageEvent<any>) => {
		this.onResponse(e.data);
	};

	// Low-level socket management

	private createSocket() {
		console.log('Connecting...');
		this.socket = new WebSocket(WS_SERVER_URL);
		this.socket.addEventListener('open', this.onOpen);
		this.socket.addEventListener('close', this.onClose);
		this.socket.addEventListener('message', this.onSocketMsg);
	}

	private sendRequest(r: Request) {
		this.socket.send(JSON.stringify(r));
	}

	private onResponse(str: string) {
		const response: Response = JSON.parse(str);

		switch (response.message) {
			case 'not-in-session': {
				this.sessionId.value = undefined;
				this.state.value = 'not-in-session';
				break;
			}

			case 'in-session': {
				this.sessionId.value = response.content.sid;
				this.state.value = 'not-paired';
				break;
			}

			case 'not-paired': {
				this.state.value = 'not-paired';
				break;
			}

			case 'successfully-paired': {
				this.state.value = 'paired';
				break;
			}

			case 'message': {
				this.state.value = 'paired';
				this.onMessage(JSON.parse(response.content.msg));
				break;
			}

			default: {
				console.log('Response recieved', response);
				break;
			}
		}
	}

	private sendMessage(message: Message<D, E>) {
		this.sendRequest({ message: 'msg', content: { msg: JSON.stringify(message) } });
	}

	private onMessage(message: Message<D, E>) {
		switch (message.purpose) {
			case 'heartbeat': {
				this.lastHeartbeat.value = Date.now();
				this.resolveData(message.data);
				break;
			}

			case 'event': {
				this.eventListeners[message.name]?.forEach((f) => f(message.detail));
				break;
			}
		}
	}

	// Data synchronization

	private resolveData(incoming: WithRevision<D>) {
		const concerted = this.lastAgreedUponData;
		const own = { ...this.data.value, revision: this.revision };

		// nothing has changed
		if (concerted.revision >= incoming.revision) return;

		// my update has been pushed to peer
		if (deepEquals(incoming, own)) {
			this.lastAgreedUponData = own;
			return;
		}

		// peer has updated
		if (own.revision === concerted.revision && incoming.revision > own.revision) {
			this.lastAgreedUponData = incoming;
			this.data.value = omit(incoming, 'revision') as any;
			return;
		}

		// both have updated, do something smart
		if (this.role === 'founder') {
			// TODO this is not smart
			this.revision = Math.max(incoming.revision, own.revision) + 1;
			return;
		} else {
			this.lastAgreedUponData = incoming;
			this.data.value = omit(incoming, 'revision') as any;
			return;
		}
	}

	// Outward facing API

	createSession() {
		if (this.sessionId.value !== undefined) return;
		this.role = 'founder';
		this.sendRequest({ message: 'init-session' });
	}

	joinSession(sessionId: number) {
		this.role = 'joiner';
		this.sendRequest({ message: 'join-session', content: { sid: sessionId } });
	}

	addEventListener<N extends keyof E>(name: N, listener: (detail: E[N]) => void) {
		this.eventListeners[name] ??= new Set();
		this.eventListeners[name]!.add(listener);
	}

	removeEventListener<N extends keyof E>(name: N, listener: (detail: E[N]) => void) {
		this.eventListeners[name]?.delete(listener);
	}

	sendEvent<N extends keyof E>(name: N, detail: E[N]) {
		this.sendMessage({
			purpose: 'event',
			name,
			detail
		});
	}
}
