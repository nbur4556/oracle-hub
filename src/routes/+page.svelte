<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { OracleTableService } from '$lib/db/oracleTableService';
	import type { OracleTable } from '$lib/db/schema';
	import TableCard from '$lib/components/TableCard.svelte';

	let tables = $state<OracleTable[]>([]);
	let searchQuery = $state('');

	//TODO: use a functional component with error handling. See notes on the tables/[id] route 
	async function loadTables() {
		tables = await OracleTableService.getOracleTables();
	}

	onMount(() => {
		loadTables();
	});

	// FIX: Search does not seem to be working for types
	let filteredTables = $derived(
		// TODO: should rename 't', it is not a good variable name. It is not descriptive. "table" should do just fine.
		tables.filter(t => 
			t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
			(t.game || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
			t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
		)
	);
</script>

<!-- Dashboard Page -->
<div class="space-y-6">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h2 class="text-2xl font-bold text-slate-800">My Tables</h2>
			<p class="text-sm text-slate-500">Quickly access your random generators.</p>
		</div>
		<button 
			onclick={() => goto('/tables/new')}
			class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 w-fit"
		>
			<span class="text-lg">+</span> New Table
		</button>
	</div>

	<div class="relative">
		<input 
			type="text" 
			bind:value={searchQuery} 
			placeholder="Search by title, game, or tag..." 
			class="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
		/>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each filteredTables as table}
			<TableCard {table} />
		{:else}
			<div class="text-center py-12 bg-white border-2 border-dashed border-slate-200 rounded-xl">
				<p class="text-slate-500">No tables found. Create your first one!</p>
			</div>
		{/each}
	</div>
</div>
