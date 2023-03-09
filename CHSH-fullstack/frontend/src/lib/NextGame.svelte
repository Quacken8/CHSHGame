<script lang="ts">
	import catdance from '../assets/breakdance-cat-electronic-jazz.gif';

	import { getAppState } from '../types';

	const appState = getAppState();

	$: gameState = $appState?.connection.data;
	//bits
	$: x = $gameState?.x;
	$: y = $gameState?.y;
    $: a = $gameState?.a;
	$: b = $gameState?.b;
	$: gameNumber = gameState?.value.gameNumber;

    let victory: boolean;
	const isWin = (x: boolean, y: boolean, a: boolean, b: boolean): boolean => {
		let A: boolean = x && y; //Logical and
		let B: boolean = (a && !b) || (!a && b); //XOR
		return A == B;
	};
	$: victory = isWin(x!, y!, a!, b!);
    console.log(x);
	if (x != undefined && y != undefined) {
		//checks if both players finished
		if (gameState?.value.gameMode == 'one-game' || Number(gameNumber) === 100) {
            // games finished
			appState!.update((s) => ({ ...s, page: 'results' }))
		} else {
			// save results
		    let gamesWon = Number(gameState?.value.gamesWon);
		    gameState!.update((s) => ({ ...s, gamesWon: gamesWon+1}));
			// go to dial again
            appState!.update((s) => ({ ...s, page: 'measurement' }))
		}
	}
</script>

<h1>Čekám na odpověď druhého hráče</h1>
<img class="image" alt="Kočka točící se na jedné tlapce jako při breakdance." src={catdance} />
