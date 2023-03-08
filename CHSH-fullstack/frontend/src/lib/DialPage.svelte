<script lang="ts">
	import Dial from './Dial.svelte';
	import Footer from './Footer.svelte';
	import { getAppState } from '../types';

	const appState = getAppState();
	

	export let angleNum = 0;
	export let sentBit = '?';
	export let measuredQBit = '?';
	export let recievedBit = '?';

	$: gameState = $appState?.connection.data

	$: a = $gameState?.a;
	gameState?.update( (s) => ({...s,a: false}) )

	if (appState?.value.role === 'server') {

	} else if (appState?.value.role === 'client') {
	}

	function _sendUp() {
		sentBit = 'up';
	}
	function _sendDown() {
		sentBit = 'down';
	}
</script>

<main>
	<div class="centering">
		<div>
			<div><h2>Kvantové měření</h2></div>

			<div class="dialBox">
				<Dial bind:angleNum />
			</div>

			<div class="bits">
				<div class="recievedClassicalBit">
					Přišel ti |{recievedBit}⟩
				</div>
				<div class="measuredQBit">
					Naměřeno |{measuredQBit}⟩
				</div>

				<div class="replyTitle">Pošli:</div>

				<div class="replyUpBit">
					<button class="btn1" on:click={_sendUp}> |↑⟩ </button>
				</div>
				<div class="replyDownBit">
					<button class="btn1" on:click={_sendDown}> |↓⟩</button>
				</div>
			</div>
		</div>
	</div>

	<Footer />
</main>

<style>
	.dialBox {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--primary-color);
		width: 50vw;
		height: 60vh;
		margin-top: 15px;
		margin-bottom: 15px;
	}

	.bits {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr 0.5fr 1fr;
		grid-column-gap: 6px;
		grid-row-gap: 3px;
	}

	.recievedClassicalBit {
		display: flex;
		align-items: center;
		justify-content: center;
		grid-area: 1 / 1 / 2 / 2;
		background-color: blue;
	}

	.measuredQBit {
		display: flex;
		align-items: center;
		justify-content: center;
		grid-area: 1 / 2 / 2 / 3;
		background-color: blue;
	}

	.replyUpBit {
		grid-area: 3 / 1 / 4 / 2;
	}

	.replyDownBit {
		grid-area: 3 / 2 / 4 / 3;
	}

	.replyTitle {
		grid-area: 2 / 1 / 3 / 3;
	}

	button {
		width: 100%;
	}

	/* Settings for either desktop, or phone*/
	@media only screen and (min-width: 501px) {
	}

	@media only screen and (max-width: 501px) {
		.dialBox {
			width: 80vmin;
			height: 50vh;
		}
	}
</style>
