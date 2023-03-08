<script lang="ts">
    import Fa from "svelte-fa"
    import {
        faHeart,
        faHeartCrack
    } from "@fortawesome/free-solid-svg-icons";
	import { getAppState } from "../types";
    const appState = getAppState()
    $:lastHeartbeat = $appState?.connection.lastHeartbeat
</script>

<div>
    <p>Stav:
        {#if ( Date.now() - Number(lastHeartbeat) ) < 1200}
        <Fa icon={faHeart}/>
        {:else}
        <Fa icon={faHeartCrack}/>
        {/if}
    </p>
</div>

<style>
    
</style>