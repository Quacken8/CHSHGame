import { getContext, setContext } from 'svelte';
import { cell, type Cell } from './cell';
import { Connection } from './connection';
import { FourVector } from './quantum';

export type PageType =  'lobby' | 'gameModeSelect' | 'gameModeWaiting' | 'measurement' | 'nextGame' | 'results';
export type ServerType = 'server' | 'client' | 'none';

export interface GameState {
	gameMode: 'one-game' | 'many-games' | 'none';
	//Given bits
	a?: boolean;
	b?: boolean;
	//Selected bits
	x?: boolean;
	y?: boolean;
	//Results of measurement for Alice and Bob
	resa?: boolean;
	resb?: boolean;
	//Maybe obsolete?
	entangledPair?: [number, number, number, number];
	//many games interpretation xd
	gameNumber?: number;
	gamesWon?: number;
}

export interface GameEvents {
	'pls-measure': { angle: number, who: "Alice" | "Bob" };
	'pls-register': { value: boolean, who: "Alice" | "Bob" };
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
	});
	setContext('app-state', s);
	return s;
};

export const getAppState = (): Cell<AppState> | undefined => {
	return getContext('app-state');
};
