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

	type rulePart = 'lore' | 'rules';
	let rp: rulePart = 'lore';
	const setRulePart = (part: rulePart): void => {
		rp = part;
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
			<div class="heading">
				{#if rp === 'lore'}
					<div class="item">
						<p class="wasButton">Šlamastyka</p>
					</div>
					<div class="item">
						<button class="btn1" on:click={() => setRulePart('rules')}>Návod</button>
					</div>
				{:else if rp === 'rules'}
					<div class="item">
						<button class="btn1" on:click={() => setRulePart('lore')}>Šlamastyka</button>
					</div>
					<div class="item">
						<p class="wasButton">Návod</p>
					</div>
				{/if}
				<div class="item">
					<button class="btn1" on:click={toggleRules}>Zpět</button>
				</div>
			</div>

			{#if rp === 'lore'}
				<div>
					<p>
						Alice a Bob žijí každý na jiné planetě A a B. Jednoho dne do jejich sluneční soustavy
						letí asteroid. A & B se bojí, že narazí do jejich planety, takže se podívají jestli
						asteroid zasáhne jejich planety pomocí své pozorovatelny.
					</p>
					<p>
						Pokud asteroid míří jen planetu Alice, tak je to v pořádku, Alice má proti-asteroidové
						systémy, které se o to automaticky postarají. To samé s Bobem.
					</p>

					<p>
						Ovšem pokud zasáhne obě planety, tak to znamená, že je to obří asteroid, a planetární
						obranné systémy na to nestačí. Aby asteroid sestřelili, musí se použít meziplanetární
						dělo. Alice a Bob mají oba meziplanetární dělo, ale v tom je ten háček: pokud vystřelí
						oba najednou, tak se jejich střely strefí do sebe navzájem a nesestřelí asteroid.
					</p>

					<p>
						Řešení je tedy jasné: pokud asteroid míří na *jen* A, *jen* B, nebo mimo, měli by A i B
						nechat meziplanetární dělo ležet (nebo vystřelit oba najednou). Pokud asteroid míří na
						obě planety, musí *jen jeden* z nich použít meziplanetární dělo. Pokud velký asteroid
						nesestřelí, je po nich. Stejně tak, pokud použijí meziplanetární dělo na prázdný cíl,
						nejspíš to zasáhne důležité družice, které potřebují k přežití.
					</p>

					<p>
						Ale tady narážíme na problém: kvůli nedostatečným pozorovacím kapacitám nemůže Alice
						vědět, jestli asteroid zasáhne Boba a Bob nemůže vědět, jestli zasáhne Alici. Oba navíc
						nemají moc času na to spolu komunikovat. Jak se tedy mají zachovat?
					</p>
				</div>
			{:else if rp === 'rules'}
				<div>
					<p>
						Váš ovládací panel se skládá z ciferníku a čtyř polí pod ním. V prvním poli (vlevo nahoře)
						vidíte, jestli na Vaši planetu míří asteroid. Pod ním si můžete vybrat, zda vystřelit na 
						asteroid, nebo ne. Pro výhru je kritické, aby se oba hráči zachovali stejně, pokud asteroid 
						míří jen na jednoho z nich, a opačně ve zbylých případech.
					</p>
					<p>
						Komunikace mezi hráči je zakázána, ale mohou využít měření kvantového provázání. Na ciferníku 
						lze zvolit, v jakém směru mají měřit jejich proovázanou částici. Po výběru úhlu a 
						stisku tlačítka "Naměř úhel" se dozvíte výsledek. Jak ho využijete je na Vás. Pokud 
						jste zběhlí v kvantové mechanice, možná se v tomto měření skrývá Vaše záchrana.
					</p>
				</div>
			{/if}

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

	.heading {
		display: inline-flex;
	}

	.item {
		display: block;
		margin: 0 1vmin;
	}
	.wasButton {
		font-size: 1.2em;
		margin-top: 4.8px;
	}
</style>
