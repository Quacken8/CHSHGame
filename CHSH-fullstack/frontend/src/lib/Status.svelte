<script lang="ts">
    import Fa from "svelte-fa"
    import {
        faHeart,
        faHeartCrack
    } from "@fortawesome/free-solid-svg-icons";
    export let connected = true;
</script>

<div>
    <p>Stav připojení: 
        {#if connected}
        OK <Fa icon={faHeart}/>
        {:else}
        ?? <Fa icon={faHeartCrack}/>
        {/if}
    </p>
</div>

<style>
    
</style>