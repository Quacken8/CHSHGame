import { getContext, setContext } from 'svelte';
import { cell, type Cell } from './cell';
import { Connection } from './connection';

export type PageType =  'lobby' | 'gameModeSelect' | 'gameModeWaiting' | 'measurement' | 'results';
export type ServerType = 'server' | 'client' | 'none';

export interface GameState {
	gameMode: 'one-game' | 'many-games' | 'none';
	a?: boolean;
	b?: boolean;
	x?: boolean;
	y?: boolean;
	entangledPair?: [number, number, number, number];
}

export interface GameEvents {
	'pls-measure-my-state-alice': { angle: number };
	'just-wanted-to-say-haiii': 'uwu';
}

export interface AppState {
	page: PageType;
	role: ServerType;
	connection: Connection<GameState, GameEvents>;
}

export const createAppState = (): Cell<AppState> => {
	const s = cell<AppState>({
		page: 'lobby',
		role: 'client',
		connection: new Connection<GameState, GameEvents>({ gameMode: 'none' }),
		physics:
	});
	setContext('app-state', s);
	return s;
};

export const getAppState = (): Cell<AppState> | undefined => {
	return getContext('app-state');
};
