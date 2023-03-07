<script lang="ts">
	import { getAppState } from '../types';
	import Footer from './Footer.svelte';

	let appState = getAppState();

	const oneGame = (): void => {
		console.log('Starting one game...');
		appState.update((s) => ({ ...s, page: 'measurement' }));
	};
	const hundredGames = (): void => {
		console.log('Starting 100 games...');
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
