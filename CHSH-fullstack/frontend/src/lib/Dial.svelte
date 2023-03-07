<script lang="ts">
let angleString: string = "0";
export let angleNum: number;
$: angleNum = +angleString;
$: angleOffset = angleNum + 180;
$: angleDeg = String(angleOffset) + "deg";
</script>

<div class = "boxAroundDialAndInput">


<div class = "boxAroundDial">
<div class="outer">
    <div class="points point-0"  on:keydown={() => {}} on:click={() => console.log("a", (angleString = "00")) }></div>
	<div class="points point-1"  on:keydown={() => {}} on:click={() => console.log("a", (angleString = "30")) }></div>
	<div class="points point-2 " on:keydown={() => {}} on:click={() => console.log("a", (angleString = "60")) }></div>
	<div class="points point-3 " on:keydown={() => {}} on:click={() => console.log("a", (angleString = "90")) }></div>
	<div class="points point-4 " on:keydown={() => {}} on:click={() => console.log("a", (angleString = "120")) }></div>
	<div class="points point-5 " on:keydown={() => {}} on:click={() => console.log("a", (angleString = "150")) }></div>
	<div class="points point-6 " on:keydown={() => {}} on:click={() => console.log("a", (angleString = "180")) }></div>
	<div class="points point-7 " on:keydown={() => {}} on:click={() => console.log("a", (angleString = "210")) }></div>
	<div class="points point-8 " on:keydown={() => {}} on:click={() => console.log("a", (angleString = "240")) }></div>
	<div class="points point-9 " on:keydown={() => {}} on:click={() => console.log("a", (angleString = "270")) }></div>
	<div class="points point-10" on:keydown={() => {}} on:click={() => console.log("a", (angleString = "300")) }></div>
	<div class="points point-11" on:keydown={() => {}} on:click={() => console.log("a", (angleString = "330")) }></div>
    <div class="needle" style="--angle: {angleDeg}" ></div>
</div>
</div>

<div class="boxAroundInput">
    <div class="smallerBoxAroundInput">
    <input type="range" min="0" max="360" bind:value={angleString} class = "inputAngle">
    <input bind:value={angleString}>
    </div>
</div>

</div>

<style>
:root {
    --angle: 180deg;
    --size: 400px;
    --clock-offset: 20px
}
.smallerBoxAroundInput{
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.boxAroundDialAndInput{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
}

.boxAroundDial{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.boxAroundInput{
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
    width:  var(--size);
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
    content: "";
    position: absolute;
    left: calc(50% - 2.5px);
    top: 50%;
    height: 48%;
    width: 5px;
    background: black;
}

.needle:after {
    content: "";
    position: absolute;
    top: calc(98% + 5px);
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
	width: 10px;
	height: 10px;
	background: #777;
	left: calc((var(--size)/2) - 5px   );
	top: var(--clock-offset);
	border-radius: 100%;
	-webkit-transform-origin: 50% calc(var(--size)/2 - var(--clock-offset));
	transform-origin: 50% calc(var(--size)/2 - var(--clock-offset));
}
.point-0 { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
.point-1 { -webkit-transform: rotate(30deg); transform: rotate(30deg); }
.point-2 { -webkit-transform: rotate(60deg); transform: rotate(60deg); }
.point-3 { -webkit-transform: rotate(90deg); transform: rotate(90deg); }
.point-4 { -webkit-transform: rotate(120deg); transform: rotate(120deg); }
.point-5 { -webkit-transform: rotate(150deg); transform: rotate(150deg); }
.point-6 { -webkit-transform: rotate(180deg); transform: rotate(180deg); }
.point-7 { -webkit-transform: rotate(210deg); transform: rotate(210deg); }
.point-8 { -webkit-transform: rotate(240deg); transform: rotate(240deg); }
.point-9 { -webkit-transform: rotate(270deg); transform: rotate(270deg); }
.point-10 { -webkit-transform: rotate(300deg); transform: rotate(300deg); }
.point-11 { -webkit-transform: rotate(330deg); transform: rotate(330deg); }


</style>