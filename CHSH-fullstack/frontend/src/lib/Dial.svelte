<script lang="ts">
	let angleString: string = '0';
	export let angleNum: number;
	$: angleNum = +angleString;
	$: angleOffset = angleNum + 180;
	$: angleDeg = String(angleOffset) + 'deg';
</script>

<div class="boxAroundDialAndInput">
	<div class="boxAroundDial">
		<div class="outer">
			{#each Array(12) as _, i}
				<div
					class="points point-{i}"
					on:keydown={() => {}}
					on:click={() => (angleString = String(i * 30))}
				/>
			{/each}
			<div class="needle" style="--angle: {angleDeg}" />
		</div>
	</div>

	<div class="boxAroundInput">
		<input bind:value={angleString} class="inputAngle" />
	</div>
</div>

<style>
	:root {
		--angle: 180deg;
		--size: 50vmin;
		--point-inset: 4vmin;
		--point-radius: 1.5vmin;
	}

	input {
		width: 2em;
		font-size: 1.25em;
		text-align: center;
	}

	.boxAroundDialAndInput {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
		position: relative;
	}

	.boxAroundDial {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.boxAroundInput {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.inputAngle {
		position: absolute;
	}

	.outer {
		position: absolute;
		display: inline-block;
		height: var(--size);
		width: var(--size);
		background: lightgray;
		border-radius: 50%;
	}

	.needle {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
	}

	.needle:before {
		content: '';
		position: absolute;
		left: calc(50% - 2.5px);
		top: 50%;
		height: calc(45%);
		width: 5px;
		background: black;
	}

	.needle:after {
		content: '';
		position: absolute;
		top: calc(95% + 5px);
		left: 50%;
		height: 10px;
		width: 10px;
		transform: rotate(-135deg);
		transform-origin: top left;
		border-top: 5px solid black;
		border-left: 5px solid black;
	}

	.outer .needle {
		transform: rotate(var(--angle));
		transform-origin: center center;
	}

	.points {
		position: absolute;
		z-index: 2;
		width: calc(2 * var(--point-radius));
		height: calc(2 * var(--point-radius));
		background: #777;
		left: calc((var(--size) / 2) - var(--point-radius));
		top: var(--point-inset);
		border-radius: 100%;
		-webkit-transform-origin: 50% calc(var(--size) / 2 - var(--point-inset));
		transform-origin: 50% calc(var(--size) / 2 - var(--point-inset));
	}
	.point-0 {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	.point-1 {
		-webkit-transform: rotate(30deg);
		transform: rotate(30deg);
	}
	.point-2 {
		-webkit-transform: rotate(60deg);
		transform: rotate(60deg);
	}
	.point-3 {
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}
	.point-4 {
		-webkit-transform: rotate(120deg);
		transform: rotate(120deg);
	}
	.point-5 {
		-webkit-transform: rotate(150deg);
		transform: rotate(150deg);
	}
	.point-6 {
		-webkit-transform: rotate(180deg);
		transform: rotate(180deg);
	}
	.point-7 {
		-webkit-transform: rotate(210deg);
		transform: rotate(210deg);
	}
	.point-8 {
		-webkit-transform: rotate(240deg);
		transform: rotate(240deg);
	}
	.point-9 {
		-webkit-transform: rotate(270deg);
		transform: rotate(270deg);
	}
	.point-10 {
		-webkit-transform: rotate(300deg);
		transform: rotate(300deg);
	}
	.point-11 {
		-webkit-transform: rotate(330deg);
		transform: rotate(330deg);
	}

	@media only screen and (max-width: 501px) {
		:root {
			--angle: 180deg;
			--size: 65vmin;
			--point-inset: 6vmin;
			--point-radius: 2vmin;
		}
	}
</style>
