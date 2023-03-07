<script lang="ts">
	import { getAppState } from '../types';

    let appState = getAppState();

	const leaveSession = (): void => {
		//Here goes Michal's code to leave session
		//Here goes some code to route back to Sessions.svelte
    	appState.update((s) => ({ ...s, page: 'lobby' }));
	};
</script>

<div>
	<button class="btn1 margin" on:click={leaveSession}>Konec, do salónku</button>
</div>

<style>
    .margin {
        margin: calc(16px - var(--button-padding-y)) 0;
    }
</style>
