<script>
    export let victory = true;
    export let aliceRecieved = "down";
    export let bobRecieved = "down";
    export let aliceMeasured = "up";
    export let bobMeasured = "up";
    export let aliceSent = "up";
    export let bobSent = "up";
</script>

<div class = "centering">

    <div class="parent">
        <div class="div1"> Konec hry! </div>
        <div class="div2"> Alice přišel {aliceRecieved}</div>
        <div class="div3"> Bobovi přišel {bobRecieved}</div>
        <div class="div4"> Alice změřila {aliceMeasured}</div>
        <div class="div5"> Bob změřil {bobMeasured}</div>
        <div class="div6"> Alice odeslala {aliceSent}</div>
        <div class="div7"> Bob odeslal {bobSent}</div>
        <div class="div8"> 
            {#if victory}
                Vyhráli jste! C:
            {:else}
                Prohráli jste :C
            {/if}
        </div>
    </div> 

</div>

<style>
    .parent {
    width: 35vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 0.3fr 0.3fr 0.3fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    }

    .div1 { 
        margin-bottom: 1em;
        grid-area: 1 / 1 / 2 / 3; 
        font-size: 3em;
    }
    .div2 { 
        margin-bottom: 0px;
        grid-area: 2 / 1 / 3 / 2; }
    .div3 { grid-area: 2 / 2 / 3 / 3; }
    .div4 { grid-area: 3 / 1 / 4 / 2; }
    .div5 { grid-area: 3 / 2 / 4 / 3; }
    .div6 { grid-area: 4 / 1 / 5 / 2; }
    .div7 { grid-area: 4 / 2 / 5 / 3; }
    .div8 { 
        margin-top: 1em;
        grid-area: 5 / 1 / 6 / 3; 
        font-size: 3em;
        }
</style>