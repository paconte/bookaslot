<script>
	import DateNavigation from './DateNavigation.svelte';
	import BookingTable from './BookingTable.svelte';
	import {getReservationsTable2} from './service.js';

	let weekData = getReservationsTable2();
</script>


<main>

	<!-- components -->
	<section class="container mx-auto p-6 font-mono">
		<DateNavigation data={weekData}/>
		<br />
		<BookingTable data={weekData}/>

	</section>

</main>


<style lang="postcss" global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>