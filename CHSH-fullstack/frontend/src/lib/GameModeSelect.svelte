<script lang="ts">
	import { Connection } from '../connection';
	import { getAppState } from '../types';
	import Footer from './Footer.svelte';

	let appState = getAppState();
    
    $: gameState = $appState!.connection.data;
	
	const oneGame = (): void => {
		console.log('Starting one game...');
		$appState!.connection.data.value = {gameMode: 'one-game'};
		gameState!.update((s) => ({ ...s, gameNumber: 1}));
		appState!.update((s) => ({ ...s, page: 'measurement' }));
	};
	
	const hundredGames = (): void => {
		console.log('Starting 100 games...');
		$appState!.connection.data.value = {gameMode: 'many-games'};
		gameState!.update((s) => ({ ...s, gameNumber: 1}));
		gameState!.update((s) => ({ ...s, gamesWon: 0}));
		appState!.update((s) => ({ ...s, page: 'measurement' }));
	};
</script>

<div class="centering">
	<div>
		<h1>Vyber herní mód</h1>

		<button class="btn1" on:click={oneGame}>Jedna hra</button>
		<br /><br />
		<button class="btn1" on:click={hundredGames}>Sto her</button>
	</div>
</div>

<Footer />

<style>
</style>
