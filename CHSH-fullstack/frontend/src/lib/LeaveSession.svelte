<script lang="ts">
	const leaveSession = (): void => {
		//Here goes Michal's code to leave session
		//Here goes some code to route back to Sessions.svelte
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
