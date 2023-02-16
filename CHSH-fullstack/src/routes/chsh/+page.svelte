<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>The CHSH Game</title>
	<meta name="description" content="The CHSH Game" />
</svelte:head>

<div class="text-column">
  The id is: {data.id}.
</div>