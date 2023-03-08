<script lang="ts">
	import Fa from 'svelte-fa';
	import { faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons';
	import { getAppState } from '../types';
	import { now } from '../utils';
	const appState = getAppState();
	$: lastHeartbeat = $appState?.connection.lastHeartbeat;
</script>

<div>
	<p>
		Stav:
		{#if $now - ($lastHeartbeat ?? 0) < 2_000}
			<Fa icon={faHeart} />
		{:else}
			<Fa icon={faHeartCrack} />
		{/if}
	</p>
</div>
