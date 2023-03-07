import { getContext, setContext } from 'svelte';
import { cell, type Cell } from './cell';
import { Connection } from './connection';

export interface AppState {
	page: 'lobby' | 'gameModeSelect' | 'measurement' | 'results';
	role: 'server' | 'client';
	connection: Connection;
}

export const createAppState = (): Cell<AppState> => {
	const s = cell<AppState>({
		page: 'gameModeSelect',
		role: 'client',
		connection: new Connection()
	});
	setContext('app-state', s);
	return s;
};

export const getAppState = (): Cell<AppState> | undefined => {
	return getContext('app-state');
};
