<script lang="ts">
	import svelteLogo from './assets/svelte.svg';
	import Counter from './lib/Counter.svelte';
	import DialPage from './lib/DialPage.svelte';
	import { connect, createAppState } from './types';
	import Sessions from './lib/Sessions.svelte';
	import GameModeSelect from './lib/GameModeSelect.svelte';

	const appState = createAppState();
	connect(appState);

	let angleNum: number;
</script>

<main>
	<!--
<DialPage bind:angleNum/>
-->

	<GameModeSelect />
</main>
