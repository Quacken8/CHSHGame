<script lang="ts">
	import catdance from '../assets/breakdance-cat-electronic-jazz.gif';
	import { getAppState } from '../types';

	const appState = getAppState();

	$: sessionId$ = $appState?.connection.sessionId;
	$: sessionId = $sessionId$;

	$: state = $appState?.connection.state;
	$: paired = $state === 'paired';
	$: if (paired && $appState?.role === 'server') {
		appState!.update((s) => ({ ...s, page: 'gameModeSelect' }));
	}
	$: if (paired && $appState?.role === 'client') {
		appState!.update((s) => ({ ...s, page: 'gameModeWaiting' }));
	}

	let isCreatingSession: boolean = false;

	const joinSession = (id: number | undefined) => {
		if (id === undefined) return;
		isFindingSession = true;
		$appState?.connection.joinSession(+id);
		appState!.update((s) => ({ ...s, role: 'client' }));
		//TODO: make sure that if the joining is aborted, role goes back to 'none'
	};

	const createSession = (): void => {
		isCreatingSession = !isCreatingSession; // FIXME why
		console.log($appState);
		$appState?.connection.createSession();
		appState!.update((s) => ({ ...s, role: 'server' }));
	};

	const cancelSession = (): void => {
		isCreatingSession = !isCreatingSession; // FIXME why
		// TODO
		appState!.update((s) => ({ ...s, role: 'none' }));
	};

	let isJoiningSession: boolean = false;
	const toggleJoining = (): void => {
		isJoiningSession = !isJoiningSession;
	};

	let isFindingSession: boolean = true;

	let isRules: boolean = true;
	const toggleRules = () => {
		isRules = !isRules;
	};
</script>

<div class="full">
	<div>
		<h1>Salónek</h1>
		{#if isRules}
			{#if isCreatingSession}
				<div>
					<p class="message">Čekání na připojení Boba...</p>
					<p class="message">Číslo sezení: {sessionId}</p>

					<img
						class="image"
						alt="Kočka točící se na jedné tlapce jako při breakdance."
						src={catdance}
					/>
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

				{#if !isJoiningSession}
					<br />
					<div>
						<button class="btn1" on:click={toggleJoining}>Připoj se ke hře (Bob)</button>
					</div>
				{/if}

				{#if isJoiningSession}
					{#if isFindingSession}
						<div>
							<p class="message">Zadej id hry:</p>
						</div>

						<input bind:value={sessionId} />

						<br />

						<div>
							<button class="btn1" on:click={() => joinSession(sessionId)}>Hledej</button>
						</div>
					{:else}
						<div>
							<p class="message">Hledám hru Alice s id: {sessionId}</p>

							<img
								class="image"
								alt="Kočka točící se na jedné tlapce jako při breakdance."
								src={catdance}
							/>
						</div>

						<br />

						<div>
							<button class="btn1" on:click={() => (isFindingSession = false)}>Zpět</button>
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

		{#if !isCreatingSession && !isJoiningSession}
			<br />
			<div>
				<button class="btn1" on:click={toggleRules}>Pravidla</button>
			</div>
		{/if}
		{:else}
			<div>
				<p>Vysvětlení pravidel</p>
			</div>

			<div>
				<button class="btn1" on:click={toggleRules}>Zpět</button>
			</div>
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
