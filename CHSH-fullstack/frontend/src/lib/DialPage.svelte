<script lang="ts">
    import Dial from './Dial.svelte'
</script>


<main class = "wholePage">

<div class = "title">
    Kvantové měření
</div>

<div class = "dialBox">
Dial
</div>

<div class = "bits">
    <div class = "recievedClassicalBit">
    Přišel ti ↑
    </div>
    <div class = "measuredQBit">
    Změřils |?⟩
    </div>

    <div class ="replyTitle">
    Pošli:
    </div>

    <div class = "replyUpBit">
        <button> |↑⟩ </button>
    </div>
    <div class="replyDownBit">
        <button> |↓⟩</button>
    </div>

</div>

</main>

<style>

.wholePage {
    display:flex;
    flex-direction: column;
    align-items: center;
    align-content: stretch;
}

.title {
    font-size:30px;
    font-weight: bolder;
}

.dialBox {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: brown;
    width: 50vw;
    height: 50vh;
    margin-top: 15px;
    margin-bottom: 15px;
}

.bits{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 0.5fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px; 
}



.recievedClassicalBit{
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: 1 / 1 / 2 / 2;
    background-color: blue;
}

.measuredQBit{
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: 1 / 2 / 2 / 3;
    background-color: blue;
}

.replyUpBit{
    grid-area: 3 / 1 / 4 / 2;
}

.replyDownBit{
    grid-area: 3 / 2 / 4 / 3; 
}

.replyTitle{
    grid-area: 2 / 1 / 3 / 3;
}

button {
    width: 100%;
}

</style>