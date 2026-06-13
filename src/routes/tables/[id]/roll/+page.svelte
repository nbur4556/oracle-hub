<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { TableService } from '$lib/db/tableService';
	import { EntryService } from '$lib/db/entryService';
	import { rollTable } from '$lib/db/rollUtils';
	import type { Table, Entry } from '$lib/db/schema';

	let tableId = $derived(Number($page.params.id));
	let table = $state<Table | null>(null);
	let entries = $state<Entry[]>([]);
	
	let lastRoll = $state<{ roll: number, result: Entry | null, max: number } | null>(null);
	let isRolling = $state(false);

	async function loadTable() {
		table = await TableService.getTableById(tableId);
		if (table) {
			entries = await EntryService.getEntriesByTable(tableId);
		}
	}

	onMount(() => {
		loadTable();
	});

	async function performRoll() {
		isRolling = true;
		// Add a little artificial delay for suspense
		await new Promise(r => setTimeout(r, 600));
		
		const result = rollTable(entries);
		lastRoll = result;
		isRolling = false;
	}

	async function handlePointerRoll() {
		if (lastRoll?.result?.pointerTableId) {
			window.location.href = `/tables/${lastRoll.result.pointerTableId}/roll`;
		}
	}
</script>

<div class="max-w-2xl mx-auto space-y-6">
	{#if table}
		<div class="flex justify-between items-center mb-6">
			<a href="/tables/{tableId}" class="p-2 hover:bg-slate-200 rounded-full transition-colors">⬅️ Back to Table</a>
			<h2 class="text-3xl font-bold text-slate-800">{table.title}</h2>
		</div>

		<div class="flex flex-col items-center justify-center py-12 space-y-8 text-center">
			<div class="relative group">
				<div class="w-32 h-32 bg-indigo-600 text-white rounded-full flex items-center justify-center text-5xl shadow-xl transition-transform active:scale-95 group-hover:scale-105 cursor-pointer" onclick={performRoll}>
					🎲
				</div>
				{#if isRolling}
					<div class="absolute inset-0 animate-bounce flex items-center justify-center text-2xl">
						✨
					</div>
				{/if}
			</div>

			{#if lastRoll}
				<div class="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<p class="text-slate-500 font-medium">Rolled a <span class="text-indigo-600 font-bold">{lastRoll.roll}</span> (out of {lastRoll.max})</p>
					<div class="p-6 bg-white border-2 border-indigo-100 rounded-2xl shadow-sm text-center">
						<h3 class="text-xl font-bold text-slate-800">{lastRoll.result?.value || 'No result!'}</h3>
						{#if lastRoll.result?.pointerTableId}
							<div class="mt-4 p-3 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100 flex items-center justify-center gap-2">
								Pointer: This result points to another table!
								<button 
									onclick={handlePointerRoll}
									class="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs hover:bg-indigo-700 transition-colors"
								>
									Roll Now
								</button>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div class="text-center py-12">
			<p class="text-slate-500">Table not found.</p>
		</div>
	{/if}
</div>
