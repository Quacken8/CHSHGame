import { cell, type Cell } from './cell';
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

interface Message {
	purpose: 'heartbeat';
}

const WS_SERVER_URL = 'wss://quantum-be.dsrod.cz/qbit';
const HEARTBEAT_DELAY = 1_000;

export class Connection {
	socket!: WebSocket;
	private heartbeatInterval = -1;

	sessionId = cell<number | undefined>(undefined);
	open = cell(false);
  state = cell<"not-in-session" | "not-paired" | "paired">("not-in-session");
  lastHeartbeat = cell(0);

	constructor() {
		this.createSocket();
		(window as any).connection = this;
	}

	private createSocket() {
		console.log('Connecting...');
		this.socket = new WebSocket(WS_SERVER_URL);

		// once the socket opens, marks it as open and starts a heartbeat message
		this.socket.addEventListener('open', () => {
			console.log('Connected!');

			this.open.value = true;
			this.heartbeatInterval = setInterval(
				() => this.sendMessage({ purpose: 'heartbeat' }),
				HEARTBEAT_DELAY
			);
		});

		// once the socket closes, update app state and try to reconnect
		this.socket.addEventListener('close', () => {
			console.log('Disconnected!');

			this.open.value = false;
			this.sessionId.value = undefined;
      this.state.value = "not-in-session";

			clearInterval(this.heartbeatInterval);
			this.createSocket();
		});

		this.socket.addEventListener('message', (e) => {
			this.onResponse(e.data);
		});
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

  onMessage(message: Message) {
    switch (message.purpose) {
      case 'heartbeat': {
        this.lastHeartbeat.value = Date.now();
      }
    }
  }

	createSession() {
		if (this.sessionId.value !== undefined) return;
		this.sendRequest({ message: 'init-session' });
	}

	joinSession(sessionId: number) {
		this.sendRequest({ message: 'join-session', content: { sid: sessionId } });
	}

	sendMessage(message: Message) {
		this.sendRequest({ message: 'msg', content: { msg: JSON.stringify(message) } });
	}
}
