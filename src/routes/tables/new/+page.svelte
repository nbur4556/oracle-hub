<script lang="ts">
	import { OracleTableService } from '$lib/db/oracleTableService';
	import { EntryService } from '$lib/db/entryService';
	import { SettingService } from '$lib/db/settingService';
	import { goto } from '$app/navigation';

	let title = $state('');
	let game = $state('');
	let type = $state('');
	let tags = $state('');
	
	let entries = $state([
		{ value: '', rangeStart: 1, rangeEnd: 1, pointerTableId: undefined }
	]);

	let error = $state('');
	let isSaving = $state(false);

	//TODO: THOROUGHLY test this route, for now it works good during basic usage

	//TODO: implement-new-tables: When adding a new row, the range start should start at the next number from the previous row. Makes it a little nicer for the user to enter multiple rows.
	//TODO: implement-new-tables: The rangeEnd should default to one above the rangeStart, for faster ux for the user.
	async function addEntry() {
		entries = [...entries, { value: '', rangeStart: 1, rangeEnd: 1, pointerTableId: undefined }];
	}

	async function removeEntry(index: number) {
		entries = entries.filter((_, i) => i !== index);
	}

	function validateRanges() {
		if (entries.length === 0) return { valid: false, msg: 'At least one entry is required.' };
		
		// Sort entries by rangeStart
		const sorted = [...entries].sort((a, b) => a.rangeStart - b.rangeStart);
		
		if (sorted[0].rangeStart !== 1) {
			return { valid: false, msg: 'Ranges must start at 1.' };
		}

		for (let i = 0; i < sorted.length - 1; i++) {
			if (sorted[i].rangeEnd >= sorted[i+1].rangeStart) {
				return { valid: false, msg: `Overlap or gap detected between range ${sorted[i].rangeStart}-${sorted[i].rangeEnd} and ${sorted[i+1].rangeStart}-${sorted[i+1].rangeEnd}.` };
			}
			if (sorted[i].rangeEnd + 1 !== sorted[i+1].rangeStart) {
				return { valid: false, msg: `Gap detected between ${sorted[i].rangeEnd} and ${sorted[i+1].rangeStart}.` };
			}
		}

		return { valid: true, msg: '' };
	}

	async function saveTable() {
		error = '';
		
		// Validate basic info
		//FIX: Game should not be required. Not all oracles will be associated with a game
		if (!title || !game) {
			error = 'Title and Game system are required.';
			return;
		}

		// Validate ranges
		const rangeCheck = validateRanges();
		if (!rangeCheck.valid) {
			error = rangeCheck.msg;
			return;
		}

		try {
			isSaving = true;
			
			// Check demo limit
			const currentTables = await OracleTableService.getOracleTables();
			const isUnlocked = await SettingService.getSetting('unlocked');
			const limit = await SettingService.getSetting('demo_limit') || 5;

			if (!isUnlocked && currentTables.length >= limit) {
				error = `Demo limit reached! You can only create ${limit} tables in the free version.`;
				return;
			}

			const tableId = await OracleTableService.createOracleTable({
				title,
				game,
				type,
				tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
				createdAt: Date.now()
			});

			// Add entries
			for (const entry of entries) {
				await EntryService.createEntry({
					tableId,
					value: entry.value,
					rangeStart: entry.rangeStart,
					rangeEnd: entry.rangeEnd,
					pointerTableId: entry.pointerTableId
				});
			}

			goto(`/tables/${tableId}`);
		} catch (e) {
			error = 'An unexpected error occurred while saving.';
			console.error(e);
		} finally {
			isSaving = false;
		}
	}
</script>

<div class="max-w-2xl mx-auto space-y-8">
	<div class="flex items-center gap-4">
		<a href="/" class="p-2 hover:bg-slate-200 rounded-full transition-colors">⬅️</a>
		<h2 class="text-2xl font-bold text-slate-800">Create New Table</h2>
	</div>

	{#if error}
		<div class="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
			{error}
		</div>
	{/if}

	<div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
		<h3 class="font-semibold text-slate-700 border-b pb-2">Basic Information</h3>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<div class="space-y-1">
				<label for="title" class="text-xs font-medium text-slate-500 uppercase">Title *</label>
				<input id="title" bind:value={title} type="text" placeholder="e.g. Random Loot" class="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
			</div>
			<div class="space-y-1">
				<label for="game" class="text-xs font-medium text-slate-500 uppercase">Game System *</label>
				<input id="game" bind:value={game} type="text" placeholder="e.g. Cyberpunk RED" class="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
			</div>
			<div class="space-y-1">
				<label for="type" class="text-xs font-medium text-slate-500 uppercase">Type</label>
				<input id="type" bind:value={type} type="text" placeholder="e.g. Treasure" class="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
			</div>
			<div class="space-y-1">
				<label for="tags" class="text-xs font-medium text-slate-500 uppercase">Tags (comma separated)</label>
				<input id="tags" bind:value={tags} type="text" placeholder="loot, cyberpunk, high-tech" class="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
			</div>
		</div>
	</div>

	<div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
		<div class="flex justify-between items-center border-b pb-2">
			<h3 class="font-semibold text-slate-700">Entries & Roll Ranges</h3>
			<button onclick={addEntry} class="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100 transition-colors font-medium">
				+ Add Entry
			</button>
		</div>

		<div class="space-y-3">
			{#each entries as entry, i}
				<div class="flex flex-col sm:flex-row gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 group">
					<div class="flex items-center gap-2">
						<div class="w-16">
							<input bind:value={entry.rangeStart} type="number" class="w-full px-2 py-1 text-center border rounded text-sm" />
						</div>
						<span class="text-slate-400">-</span>
						<div class="w-16">
							<input bind:value={entry.rangeEnd} type="number" class="w-full px-2 py-1 text-center border rounded text-sm" />
						</div>
					</div>
					<div class="flex-1">
						<input bind:value={entry.value} type="text" placeholder="Result text..." class="w-full px-3 py-1 border rounded text-sm" />
					</div>
					<button onclick={() => removeEntry(i)} class="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
						🗑️
					</button>
				</div>
			{/each}
		</div>
		<p class="text-[10px] text-slate-400 italic">Ranges must be continuous starting from 1 (e.g. 1-5, 6-10, 11-20).</p>
	</div>

	<div class="flex justify-end pt-4">
		<button 
			onclick={saveTable} 
			disabled={isSaving}
			class="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
		>
			{isSaving ? 'Saving...' : 'Create Table'}
		</button>
	</div>
</div>
