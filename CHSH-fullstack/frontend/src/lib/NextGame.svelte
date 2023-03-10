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

	function didBothSend(a?:boolean, b?:boolean){ // when both a and b get set it means both sent bits and we can continue
		if (a != undefined && b != undefined) {
			if (gameState?.value.gameMode == 'one-game' || gameNumber! === 100) {
    	        // games finished
				appState!.update((s) => ({ ...s, page: 'results' }))
			} else {
				// save results
			    let gamesWon = gameState!.value.gamesWon!;
			    gameState!.update((s) => ({ ...s, gamesWon: gamesWon+1}));
				// go to dial again
			    gameState!.update((s) => ({ ...s, a: undefined})); // makes sure next time 
    	        gameState!.update((s) => ({ ...s, b: undefined})); // the game will know they havent chosen yet
    	        appState!.update((s) => ({ ...s, page: 'measurement' }))
			}
		}
	}

	$: didBothSend(a, b);

</script>


<div class="centering">
	<div>
		<h1>Čekám na druhého hráče...</h1>

		<img class="image" alt="Kočka točící se na jedné tlapce jako při breakdance." src={catdance} />
	</div>
</div>

<style>
		.image {
		width: 50vmin;
		margin-bottom: 10px;
	}
</style>