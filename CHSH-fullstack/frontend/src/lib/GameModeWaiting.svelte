<script lang="ts">
	import catdance from '../assets/breakdance-cat-electronic-jazz.gif';
	import Footer from './Footer.svelte';
	import { getAppState } from '../types'; 
    import type { pagetype } from '../types';

	const appState = getAppState();

    let isGameModeChosen: boolean = false;
    let gameMode: pagetype;

	const goToMeasure = (mode: pagetype): void => {
		appState!.update((s) => ({ ...s, page: mode }));
	};

    $: if ( isGameModeChosen ) {
        goToMeasure(gameMode);
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
