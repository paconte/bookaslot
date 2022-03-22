<script>
	import DateNavigation from './DateNavigation.svelte';
	import BookingTable from './BookingTable.svelte';
	import {getReservationsTable3} from './service.js';

	//let weekData = getReservationsTable2();
	let dailyData = getReservationsTable3();
</script>


<main>

	<!-- components -->
	<section class="container mx-auto p-6 font-mono">

		{#await dailyData}
			<p>...waiting</p>
		{:then data}
			<DateNavigation data={data}/>
			<br />

			<BookingTable data={data}/>
			<br />
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}

	</section>

</main>


<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>