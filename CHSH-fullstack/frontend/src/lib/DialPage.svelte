<script lang="ts">
	import Dial from './Dial.svelte';
	import Footer from './Footer.svelte';
	import { getAppState } from '../types';
	import { EntangledQubits as EntangledQubits } from '../quantum';
	import { FourVector } from '../quantum';

	const appState = getAppState();

	export let angleNum = 0;

	$: gameState = $appState?.connection.data;
	//Given bits
	$: x = $gameState?.x;
	$: y = $gameState?.y;
	//Selected bits
	$: a = $gameState?.a;
	$: b = $gameState?.b;
	//TODO change the role of selected & given bits
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
	let givenText: 'x' | 'y';
	let selectText: 'a' | 'b';

	let result: boolean;
	let resultText: 'ano' | 'ne';
	$: if (result == true) {
		resultText = 'ano';
	} else {
		resultText = 'ne';
	}
	console.log(appState?.value.role);
	let haveMeasured: boolean = false;
	let haveSelected: boolean = false;
	if (appState?.value.role === 'server') {
		//Alice generates x and y and saves them to the store (this must happen only once)
		let xrand: boolean = Math.random() < 0.5;
		let yrand: boolean = Math.random() < 0.5;
		console.log("Generating x and y: " + String(xrand) + " and " + String(yrand))
		appState?.value.connection.data.update((s) => ({ ...s, x: xrand }));
		appState?.value.connection.data.update((s) => ({ ...s, y: yrand })); 
	}

	//Alice is the keeper of the qubits, but Bob can have his (useless) Qubit too
	let Q = new EntangledQubits(initialQ);
	$: if (appState?.value.role === 'server') {
		//Alice uses a and x (while Bob uses b and y)
		given = x!;
		selected = a!;
		givenText = 'x';
		selectText = 'a';
		result = resa!;
		console.log('given:' + String(given));
		console.log('givenText:' + givenText);
		console.log('selected:' + String(selected));
		console.log('selectText:' + selectText);

		//Alice registers the guess a or b
		$appState?.connection.addEventListener('pls-register', (params): void => {
			console.log(String(params.who) + ' sent me selected=' + String(params.value) + '.');
			if (params.who == 'Alice') {
				gameState?.update((s) => ({ ...s, a: params.value }));
			} else if (params.who == 'Bob') {
				gameState?.update((s) => ({ ...s, b: params.value }));
			}
		});
		//Alice does either Alice's, or Bob's measurement
		$appState?.connection.addEventListener('pls-measure', (params): void => {
			console.log(
				String(params.who) + ' asked me to measure under angle alpha=' + String(params.angle) + '.'
			);
			let res: boolean;
			res = Q.measureOneQubit(params.who, params.angle);
			console.log("Measured " + String(res))
			if (params.who == 'Alice') {
				gameState?.update((s) => ({ ...s, resa: res }));
			} else if (params.who == 'Bob') {
				gameState?.update((s) => ({ ...s, resb: res }));
			}
		});
	} else if (appState?.value.role === 'client') {
		given = y!;
		selected = b!;
		result = resb!;
		givenText = 'y';
		selectText = 'b';
		console.log('givenText:' + givenText);
		console.log('selectText:' + selectText);
	}

	let measured: number;
	const measureAlpha = (alpha: number): void => {
		let res: boolean;
		if (appState?.value.role === 'server') {
			console.log("Measuring Alice.")
			res = Q.measureOneQubit('Alice', alpha);
			console.log("Measured " + String(res))
			gameState?.update((s) => ({ ...s, resa: res }));
			//$appState?.connection.sendEvent('pls-measure', { angle: alpha, who: 'Alice' });
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
			gameState?.update((s) => ({ ...s, a: res }));
		} else if (appState?.value.role === 'client') {
			$appState?.connection.sendEvent('pls-register', { value: res, who: 'Bob' });
		} else {
			console.log('Error, role is none.');
		}
		haveSelected = true;
	};

	const nextGame = (): void => {
		appState!.update((s) => ({ ...s, page: 'nextGame' }));
	};
</script>

<main>
	<div class="centering">
		<div>
			<div>
				<h2 class="heading">Kontroln?? panel</h2>
				<p class="instructions">
					Vyber ??hel m????en??, nam????, a pak se rozhodni, jestli vyst??elit meziplanet??rn?? kan??n.
				</p>
			</div>

			<div class="dialBox">
				<Dial bind:angleNum />
			</div>

			<div class="bits">
				<div class="recievedClassicalBit">
					Ve dr??ze asteroidu ({givenText})? {givenDisplay}
				</div>
				{#if !haveMeasured}
					<div class="measuredQBit">
						<button class="btn1" on:click={() => measureAlpha(angleNum)}
							>Nam???? ??hel |{angleNum}?????</button
						>
					</div>
				{:else}
					<div class="measuredQBit set">
						Nam????eno |{measured}????
						{resultText}
					</div>
				{/if}

				{#if !haveSelected}
					<div class="replyTitle">Vyst??elit meziplanet??rn?? kan??n? ({selectText})</div>

					<div class="replyUpBit">
						<button class="btn1" on:click={() => sendSelected(true)}>ano</button>
					</div>
					<div class="replyDownBit">
						<button class="btn1" on:click={() => sendSelected(false)}>ne</button>
					</div>
				{:else}
					<div class="replyTitle">Meziplanet??rn?? kan??n? ({selectText})</div>

					{#if selected}
						<div class="replyUpBit set downset">Vyst??elen</div>
					{:else}
						<div>
							<button class="btn1 down" on:click={nextGame}>Pokra??uj</button>
						</div>
					{/if}

					{#if !selected}
						<div class="replyDownBit set downset">
							<b>Ne</b>vyst??elen
						</div>
					{:else}
						<div class="replyDownBit">
							<button class="btn1 down" on:click={nextGame}>Pokra??uj</button>
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
