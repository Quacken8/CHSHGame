<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import DialPage from './lib/DialPage.svelte';
	import { connect, createAppState } from './types';

  const appState = createAppState();
  connect(appState);

  let angleNum:number

</script>

<main>

<DialPage bind:angleNum/>

</main>