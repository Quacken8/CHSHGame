<script lang="ts">
	import catdance from '../assets/breakdance-cat-electronic-jazz.gif';

	let sessionid: string;
	let isCreatingSession: boolean = false;

	const joinSession = (id: string) => {
		let a = 1;
		console.log('Join Session: TODO');
		//Michal's code to join sessions here
	};

	const createSession = (): void => {
		isCreatingSession = !isCreatingSession;
		console.log('Create Session: TODO');
		//Michal's code to create sessions here
	};

	const cancelSession = (): void => {
		isCreatingSession = !isCreatingSession;
		console.log('Cancelled Session: TODO');
		//Michal's code to cancel the creation of a session here
	};

	let isJoiningSession: boolean = false;
	const toggleJoining = (): void => {
		isJoiningSession = !isJoiningSession;
	};

	let isFindingSession: boolean = true;
	const toggleFinding = (id: string) => {
		if (!isFindingSession) {
			joinSession(id);
		}
		isFindingSession = !isFindingSession;

		console.log('Finding Session...');
	};
</script>

<div class="full">
<div>
<h1>Salónek</h1>

{#if isCreatingSession}
	<div>
		<p class="message">Čekání na připojení Boba...</p>

		<img class="image" alt="Kočka točící se na jedné tlapce jako při breakdance." src={catdance} />
	</div>

	<br />

	<div>
		<button class="btn1" on:click={cancelSession}>Zpět</button>
	</div>
{:else}
	{#if !isJoiningSession}
		<div>
			<button class="btn1" on:click={createSession}>Vytvoř hru (Alice)</button>
		</div>
	{/if}

	<br />

	{#if !isJoiningSession}
		<div>
			<button class="btn1" on:click={toggleJoining}>Připoj se ke hře (Bob)</button>
		</div>
	{/if}

	<br />

	{#if isJoiningSession}
		{#if isFindingSession}
			<div>
				<p class="message">Zadej id hry:</p>
			</div>

			<input bind:value={sessionid} />

			<br />

			<div>
				<button class="btn1" on:click={() => toggleFinding(sessionid)}>Hledej</button>
			</div>
		{:else}
			<div>
				<p class="message">Hledám hru Alice s id: {sessionid}</p>

				<img
					class="image"
					alt="Kočka točící se na jedné tlapce jako při breakdance."
					src={catdance}
				/>
			</div>

			<br />

			<div>
				<button class="btn1" on:click={() => toggleFinding(sessionid)}>Zpět</button>
			</div>
		{/if}

		{#if isFindingSession && isJoiningSession}
			<br />

			<div>
				<button class="btn1" on:click={toggleJoining}>Zpět</button>
			</div>
		{/if}
	{/if}
{/if}

</div>
</div>

<style>
	.message {
		font-size: 1.5em;
	}

	.image {
		width: 50vmin;
		margin-bottom: 10px;
	}
</style>
