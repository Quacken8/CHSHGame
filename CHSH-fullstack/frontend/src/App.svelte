<script lang="ts">
	import Sessions from './lib/Sessions.svelte';
	import { createAppState } from './types';
	import './app.css';
	import GameModeSelect from './lib/GameModeSelect.svelte';
  import DialPage from './lib/DialPage.svelte';
	import Results from './lib/Results.svelte';

	const appState = createAppState();

	let angleNum: number;
</script>

<main>
	{#if $appState.page == 'lobby'}
		<Sessions />
	{:else if $appState.page == 'gameModeSelect'}
		<GameModeSelect />
  {:else if $appState.page == 'measurement'}
		<DialPage />
	{:else if $appState.page == 'results'}
		<Results />
	{/if}

</main>
