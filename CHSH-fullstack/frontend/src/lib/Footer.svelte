<script lang="ts">
	import Status from './Status.svelte';
	import LeaveSession from './LeaveSession.svelte';
	import { getAppState } from '../types';

	const appState = getAppState();

	$: sessionId$ = $appState?.connection.sessionId;
	$: sessionId = $sessionId$;

	$: role = $appState?.role;
</script>

<div class="footer">
	<div class="footer-item">
		{#if role === 'server'}
			<p>Alice</p>
		{:else if role === 'client'}
			<p>Bob</p>
		{/if}
	</div>
	<div class="footer-item">
		<Status />
	</div>
	<div class="footer-item">
		<LeaveSession />
	</div>
</div>

<style>
	.footer {
		display: flex;
		padding-bottom: 0vh;
		justify-content: center;
	}
	.footer-item {
		margin: 5px;
	}
</style>
