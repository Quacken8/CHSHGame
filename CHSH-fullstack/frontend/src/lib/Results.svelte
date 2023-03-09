<script lang="ts">
	import { getAppState } from '../types';
	import Footer from './Footer.svelte';
	import catdance from '../assets/breakdance-cat-electronic-jazz.gif'

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

	//Alice still registers the guess a or b
	$: if (appState?.value.role === 'server') {
		$appState?.connection.addEventListener('pls-register', (params): void => {
			console.log(String(params.who) + ' sent me selected=' + String(params.value) + '.');
			if (params.who == 'Alice') {
				gameState?.update((s) => ({ ...s, a: params.value }));
			} else if (params.who == 'Bob') {
				gameState?.update((s) => ({ ...s, b: params.value }));
			}
		});
	}
</script>

<div class="centering">
	<div>
		{#if (x != undefined) && (y != undefined)} <!-- checks if both players finished -->

		<h1>Konec hry!</h1>
		<div class="div2">Byla alice ve dráze asteroidu? {x}</div>
		<div class="div3">Byl Bob ve dráze asteroidu? {y}</div>
		<div class="div6">Vystřelila Alice? {a}</div>
		<div class="div7">Vystřelil Bob? {b}</div>
		<div class="div8">
			{#if victory}
				Vyhráli jste! C:
			{:else}
				Prohráli jste :C
			{/if}
		</div>
		{:else}
		<h1>
			Čekám na odpověď druhého hráče
		</h1>
		<img class="image" alt="Kočka točící se na jedné tlapce jako při breakdance." src={catdance} />

		{/if}
	</div>
</div>

<Footer />

<style>
</style>
