<div class = "centering">

    <div class="parent">
        <div class="div1"> Konec hry! </div>
        <div class="div2"> Alice přišel </div>
        <div class="div3"> Bobovi přišel </div>
        <div class="div4"> Alice změřila </div>
        <div class="div5"> Bob změřil </div>
        <div class="div6"> Alice odeslala </div>
        <div class="div7"> Bob odeslal </div>
        <div class="div8"> Vyhráli jste! </div>
    </div> 

</div>

<style>
    .parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    }

    .div1 { grid-area: 1 / 1 / 2 / 3; }
    .div2 { grid-area: 2 / 1 / 3 / 2; }
    .div3 { grid-area: 2 / 2 / 3 / 3; }
    .div4 { grid-area: 3 / 1 / 4 / 2; }
    .div5 { grid-area: 3 / 2 / 4 / 3; }
    .div6 { grid-area: 4 / 1 / 5 / 2; }
    .div7 { grid-area: 4 / 2 / 5 / 3; }
    .div8 { grid-area: 5 / 1 / 6 / 3; }
</style>