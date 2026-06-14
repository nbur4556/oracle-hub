<script lang="ts">
	import './layout.css';
	//TODO: replace the favicon
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- TODO: Need to test EVERY route on a mobile view -->
<div class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
	<header class="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
		<!-- TODO: clicking this should link back to the dashboard -->
		<h1 class="text-xl font-bold text-slate-800 flex items-center gap-2">
			<!-- TODO: Replace this icon (likely with the same favicon image) -->
			<span class="bg-indigo-600 text-white px-2 py-0.5 rounded text-sm mr-1">🎲</span>
			Oracle Hub
		</h1>
		<nav class="flex items-center gap-4">
			<a href="/" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Dashboard</a>
		</nav>
	</header>

	<main class="max-w-4xl mx-auto p-4 pb-20">
		{@render children()}
	</main>

	<footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 text-center text-xs text-slate-500">
		&copy; {new Date().getFullYear()} Oracle Hub &bull; Local-First
	</footer>
</div>

