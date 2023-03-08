<script lang="ts">
	import catdance from '../assets/breakdance-cat-electronic-jazz.gif';
	import Footer from './Footer.svelte';
	import { getAppState } from '../types'; 

	const appState = getAppState();

    $: gameState = $appState!.connection.data;

	$: if ( $gameState.gameMode ===  'one-game' ) {
		appState!.update((s) => ({ ...s, page: 'measurement' }));
	}
    
</script>

<div class="centering">
	<div>
		<h1>Čekání na Alici...</h1>

		<img class="image" alt="Kočka točící se na jedné tlapce jako při breakdance." src={catdance} />
	</div>
</div>

<Footer />

<style>
	.image {
		width: 50vmin;
		margin-bottom: 10px;
	}
</style>
