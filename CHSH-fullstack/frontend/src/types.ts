import { getContext, setContext } from 'svelte';
import { cell, type Cell } from './cell';
import { Connection } from './connection';

//TODO create a datatype for page and role. Use the page datatype in GameModeWaiting
export interface AppState {
	page: 'lobby' | 'gameModeSelect' | 'gameModeWaiting' | 'measurement' | 'results';
	role: 'server' | 'client' | 'none';
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
