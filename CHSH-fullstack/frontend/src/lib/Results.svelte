<script lang="ts">
	import { getAppState } from '../types';
	import Footer from './Footer.svelte';

	const appState = getAppState();
	$: gameState = $appState?.connection.data;

	//Given bits
	$: a = $gameState?.a;
	$: b = $gameState?.b;
	//Selected bits
	$: x = $gameState?.x;
	$: y = $gameState?.y;

	let victory: boolean;
	const isWin = (x: boolean, y: boolean, a: boolean, b: boolean): boolean => {
		let A: boolean = x && y; //Logical and
		let B: boolean = (a && !b) || (!a && b); //XOR
		return A == B;
	};
	$: victory = isWin(x!, y!, a!, b!);

	//Alice still registers the guess x or y
	$: if (appState?.value.role === 'server') {
		$appState?.connection.addEventListener('pls-register', (params): void => {
			console.log(String(params.who) + ' sent me selected=' + String(params.value) + '.');
			if (params.who == 'Alice') {
				gameState?.update((s) => ({ ...s, x: params.value }));
			} else if (params.who == 'Bob') {
				gameState?.update((s) => ({ ...s, y: params.value }));
			}
		});
	}
</script>

<div class="centering">
	<div>
		<h1>Konec hry!</h1>
		<div class="div2">Alice přišel {a}</div>
		<div class="div3">Bobovi přišel {b}</div>
		<div class="div6">Alice odeslala {x}</div>
		<div class="div7">Bob odeslal {y}</div>
		<div class="div8">
			{#if victory}
				Vyhráli jste! C:
			{:else}
				Prohráli jste :C
			{/if}
		</div>
	</div>
</div>

<Footer />

<style>
</style>
