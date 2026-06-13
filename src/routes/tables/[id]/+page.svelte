<script lang="ts">
	//TODO: it should not be so easy to delete entries from the table. Instead, the delete action column should only be shown in an edit view. The edit view should also allow changing the values and ranges
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { OracleTableService } from '$lib/db/oracleTableService';
	import { EntryService } from '$lib/db/entryService';
	import type { OracleTable, Entry } from '$lib/db/schema';

	let { data } = $props();
	let tableId = $derived(Number($page.params.id));
	
	let table = $state<OracleTable | null>(null);
	let entries = $state<Entry[]>([]);
	
	async function loadTable() {
		const res = await OracleTableService.getOracleTableById(tableId);
		table = res ?? null;
		if (table) {
			entries = await EntryService.getEntriesByTable(tableId);
		}
	}

	onMount(() => {
		loadTable();
	});

	async function deleteTable() {
		if (confirm('Are you sure you want to delete this table? All entries will be lost.')) {
			await OracleTableService.deleteOracleTable(tableId);
			await EntryService.deleteEntriesByTable(tableId);
			// Redirect to dashboard
			window.location.href = '/';
		}
	}
</script>

<div class="max-w-2xl mx-auto space-y-6">
	{#if table}
		<div class="flex justify-between items-center mb-6">
			<div>
				<h2 class="text-3xl font-bold text-slate-800">{table.title}</h2>
				<p class="text-sm text-slate-500">{table.game} &bull; {table.type}</p>
			</div>
			<div class="flex gap-2">
				<button 
					onclick={deleteTable}
					class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
					title="Delete Table"
				>
					🗑️
				</button>
			</div>
		</div>

		<div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr class="bg-slate-50 border-b border-slate-200">
						<th class="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Range</th>
						<th class="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Result</th>
						<th class="px-4 py-3 text-xs font-semibold text-slate-600 uppercase text-right">Action</th>
					</tr>
				</thead>
				<tbody>
					{#each entries as entry}
						<tr class="border-b border-slate-200 last:border-none">
							<td class="px-4 py-3 text-sm font-medium text-slate-700">{entry.rangeStart}-{entry.rangeEnd}</td>
							<td class="px-4 py-3 text-sm text-slate-600">{entry.value}</td>
							<td class="px-4 py-3 text-right">
								<button class="text-slate-400 hover:text-red-500 transition-colors">Delete</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if entries.length === 0}
				<div class="text-center py-8 text-slate-500 text-sm italic">
					No entries defined yet.
				</div>
			{/if}
		</div>
	{:else}
		<div class="text-center py-12">
			<p class="text-slate-500">Table not found.</p>
		</div>
	{/if}
</div>
