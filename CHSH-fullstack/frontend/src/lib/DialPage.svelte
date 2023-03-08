<script lang="ts">
	import Dial from './Dial.svelte';
	import Footer from './Footer.svelte';
	import { getAppState } from '../types';
	import { EntangledQuBits } from '../quantum';
	import { FourVector } from '../quantum';

	const appState = getAppState();

	export let angleNum = 0;

	$: gameState = $appState?.connection.data;

	//Given bits
	$: a = $gameState?.a;
	$: b = $gameState?.b;
	//Selected bits
	$: x = $gameState?.x;
	$: y = $gameState?.y;
	//Results of measurement for A and B
	$: resa = $gameState?.resa;
	$: resb = $gameState?.resb;
	//Shared quantum state
	const norm: number = 1 / Math.sqrt(2);
	let initialQ = new FourVector(norm, 0, 0, norm);
	//$: sharedQ = $gameState?.entangledPair;

	//Values for this player
	let given: boolean;
	let givenDisplay: 'ano' | 'ne';
	$: if (given == true) {
		givenDisplay = 'ano';
	} else {
		givenDisplay = 'ne';
	}

	let selected: boolean;
	let givenText: 'a' | 'b';
	let selectText: 'x' | 'y';

	let result: boolean;
	let resultText: 'ano' | 'ne';
	$: if (result == true) {
		resultText = 'ano';
	} else {
		resultText = 'ne';
	}

	let haveMeasured: boolean = false;
	let haveSelected: boolean = false;

	$: if (appState?.value.role === 'server') {
		//Alice is the keeper of the qubits
		let Q = new EntangledQuBits(initialQ);
		//Alice generates a and b and saves them to the store
		gameState?.update((s) => ({ ...s, a: Math.random() < 0.5 }));
		gameState?.update((s) => ({ ...s, b: Math.random() < 0.5 }));
		//Alice uses a and x (while Bob uses b and y)
		given = a!;
		selected = x!;
		givenText = 'a';
		selectText = 'x';
		result = resa!;
		console.log('given:' + String(given));
		console.log('givenText:' + givenText);
		console.log('selectText:' + selectText);

		//Alice registers the guess x or y
		$appState?.connection.addEventListener('pls-register', (params): void => {
			console.log(String(params.who) + ' sent me selected=' + String(params.value) + '.');
			if (params.who == 'Alice') {
				gameState?.update((s) => ({ ...s, x: params.value }));
			} else if (params.who == 'Bob') {
				gameState?.update((s) => ({ ...s, y: params.value }));
			}
		});
		//Alice does either Alice's, or Bob's measurement
		$appState?.connection.addEventListener('pls-measure', (params): void => {
			console.log(
				String(params.who) + ' asked me to measure under angle alpha=' + String(params.angle) + '.'
			);
			let res: boolean;
			res = Q.measureOneQuBit(params.who, params.angle);
			gameState?.update((s) => ({ ...s, resb: res }));
		});
	} else if (appState?.value.role === 'client') {
		given = b!;
		selected = y!;
		result = resb!;
		givenText = 'b';
		selectText = 'y';
		console.log('givenText:' + givenText);
		console.log('selectText:' + selectText);
	}

	let measured: number;
	const measureAlpha = (alpha: number): void => {
		let res: boolean;
		if (appState?.value.role === 'server') {
			$appState?.connection.sendEvent('pls-measure', { angle: alpha, who: 'Alice' });
		} else if (appState?.value.role === 'client') {
			$appState?.connection.sendEvent('pls-measure', { angle: alpha, who: 'Bob' });
		} else {
			console.log('Error, role is none.');
		}
		haveMeasured = true;
		measured = alpha;
	};

	const sendSelected = (res: boolean): void => {
		if (appState?.value.role === 'server') {
			gameState?.update((s) => ({ ...s, x: res }));
		} else if (appState?.value.role === 'client') {
			$appState?.connection.sendEvent('pls-register', { value: res, who: 'Bob' });
		} else {
			console.log('Error, role is none.');
		}
		haveSelected = true;
	};

	const showResults = (): void => {
		appState!.update((s) => ({ ...s, page: 'results' }));
	};
</script>

<main>
	<div class="centering">
		<div>
			<div>
				<h2 class="heading">Kontrolní panel</h2>
				<p class="instructions">
					Vyber úhel měření, naměř, a pak se rozhodni, jestli vystřelit meziplanetární kanón.
				</p>
			</div>

			<div class="dialBox">
				<Dial bind:angleNum />
			</div>

			<div class="bits">
				<div class="recievedClassicalBit">
					Ve dráze asteroidu ({givenText})? {givenDisplay}
				</div>
				{#if !haveMeasured}
					<div class="measuredQBit">
						<button class="btn1" on:click={() => measureAlpha(angleNum)}
							>Naměř úhel |{angleNum}⟩</button
						>
					</div>
				{:else}
					<div class="measuredQBit set">
						Naměřeno |{measured}⟩?
						{resultText}
					</div>
				{/if}

				{#if !haveSelected}
					<div class="replyTitle">Vystřelit meziplanetární kanón? ({selectText})</div>

					<div class="replyUpBit">
						<button class="btn1" on:click={() => sendSelected(true)}>ano</button>
					</div>
					<div class="replyDownBit">
						<button class="btn1" on:click={() => sendSelected(false)}>ne</button>
					</div>
				{:else}
					<div class="replyTitle">Meziplanetární kanón? ({selectText})</div>

					{#if selected}
						<div class="replyUpBit set downset">Vystřelen</div>
					{:else}
						<div>
							<button class="btn1 down" on:click={showResults}>Pokračuj</button>
						</div>
					{/if}

					{#if !selected}
						<div class="replyDownBit set downset">
							<b>Ne</b>vystřelen
						</div>
					{:else}
						<div class="replyDownBit">
							<button class="btn1 down" on:click={showResults}>Pokračuj</button>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>

	<Footer />
</main>

<style>
	.heading {
		margin-bottom: 10px;
	}

	.dialBox {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--primary-color);
		width: 70vw;
		height: 55vh;
		margin: 15px auto;
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
		background-color: var(--secondary-color);
	}

	.set {
		background-color: var(--secondary-color);
	}

	.down {
		margin-top: 4.8px;
	}

	.downset {
		padding-top: 14.4px;
	}

	.measuredQBit {
		display: flex;
		align-items: center;
		justify-content: center;
		grid-area: 1 / 2 / 2 / 3;
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
			height: 40vh;
		}
	}
</style>
