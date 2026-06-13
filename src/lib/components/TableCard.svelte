<script lang="ts">
	import type { Table } from '$lib/db/schema';

	let { table } = $props<{ table: Table }>();
</script>

<div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
	<div class="flex justify-between items-start gap-3">
		<div>
			<h3 class="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{table.title}</h3>
			<p class="text-xs text-slate-500 mt-1">{table.game} &bull; {table.type}</p>
		</div>
		<span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">
			{table.tags.length} tags
		</span>
	</div>
	<div class="flex flex-wrap gap-1 mt-3">
		{#each table.tags as tag}
			<span class="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100">
				{tag}
			</span>
		{/each}
	</div>
</div>
