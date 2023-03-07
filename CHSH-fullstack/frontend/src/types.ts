import { getContext, setContext } from 'svelte';
import { cell, type Cell } from './cell';
import { Connection } from './connection';

export type pagetype =  'lobby' | 'gameModeSelect' | 'gameModeWaiting' | 'measurement' | 'results';
export type servertype = 'server' | 'client' | 'none';
export interface AppState {
	page: pagetype;
	role: servertype;
	connection: Connection;
}

export const createAppState = (): Cell<AppState> => {
	const s = cell<AppState>({
		page: 'lobby',
		role: 'client',
		connection: new Connection()
	});
	setContext('app-state', s);
	return s;
};

export const getAppState = (): Cell<AppState> | undefined => {
	return getContext('app-state');
};
