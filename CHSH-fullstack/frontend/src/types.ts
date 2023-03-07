import { getContext } from "svelte";
import { writable, type Writable } from "svelte/store";

export * from "./ws-interfaces";

const WS_SERVER_URL = "wss://quantum-be.dsrod.cz/qbit";

export interface AppState {
  page: "initial" | "connected-menu" | "measure" | "result";
  role: "server" | "client";
  sessionId?: string;
  connection?: WebSocket;
}

export const createAppState = (): Writable<AppState> => {
  return writable({
    page: "initial",
    role: "client",
  });
}

export const getAppState = (): Writable<AppState> | undefined => {
  return getContext('app-state');
}

export function connect(appState$: Writable<AppState>) {
  console.log('Connecting...');

  // get the current value from the store
  let appState: AppState;
  appState$.subscribe(a => appState = a)();

  // if already connected, do nothing
  if (appState.connection) return;

  // open a new web socket
  const connection = new WebSocket(WS_SERVER_URL);

  // update the store
  appState$.set({
    ...appState,
    connection
  });

  // once the socket closes, update app state and try to reconnect
  connection.addEventListener('close', () => {
    console.log('Disconnected!');

    appState$.set({
      ...appState,
      connection: undefined
    });

    connect(appState$);
  });

  connection.addEventListener('open', () => {
    console.log('Connected!')
  })
}
