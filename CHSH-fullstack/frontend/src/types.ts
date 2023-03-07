import { getContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import { Connection } from "./connection";


const WS_SERVER_URL = "wss://quantum-be.dsrod.cz/qbit";

export interface AppState {
  page: "lobby" | "gameModeSelect" | "measurement" | "results";
  role: "server" | "client";
  connection: Connection;
}

export const createAppState = (): Writable<AppState> => {
  return writable({
    page: "lobby",
    role: "client",
    connection: new Connection(),
  });
}

export const getAppState = (): Writable<AppState> | undefined => {
  return getContext('app-state');
}

