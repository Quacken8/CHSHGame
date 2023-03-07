<script lang="ts">
	import Sessions from './lib/Sessions.svelte';
	import { createAppState } from './types';
	import './app.css';

	const appState = createAppState();

	let angleNum: number;
</script>

<main>
	<!--
<DialPage bind:angleNum/>
-->

	<Sessions />
</main>
