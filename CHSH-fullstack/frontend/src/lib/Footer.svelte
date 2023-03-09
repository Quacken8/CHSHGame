<script lang="ts">
	import Status from './Status.svelte';
	import LeaveSession from './LeaveSession.svelte';
	import { getAppState } from '../types';

	const appState = getAppState();

	$: sessionId$ = $appState?.connection.sessionId;
	$: sessionId = $sessionId$;

	$: gameState = $appState?.connection.data;
	$: gameNumber = gameState?.value.gameNumber;

	$: role = $appState?.role;
</script>

<div class="footer">
	<div class="footer-item">
		{#if role === 'server'}
			<p>Alice</p>
		{:else if role === 'client'}
			<p>Bob</p>
		{/if}
		{#if Number(gameNumber) > 0}
		<p>hra {gameNumber}</p>
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
		display: flex;
		flex-direction: column;
		margin: 5px;
	}
	p {
		margin: 0px;
	}
</style>
