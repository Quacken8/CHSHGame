import { getContext } from "svelte";
import { writable, type Writable } from "svelte/store";

export * from "./ws-interfaces";

export interface AppState {
  page: "initial" | "connected-menu" | "measure" | "result";
  role: "server" | "client";
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

