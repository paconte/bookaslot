<script>
	import { bookings } from './stores.js';
	import { getReservationsTable } from './service.js';
	let columns = ["Time", "Pista 1", "Pista 2"]
	let data = getReservationsTable();

	const status = {
		FREE: "FREE",
		BOOKED: "BOOKED",
	}

	/* STORE methods */
	const addBooking = (item) => {
		// add booking to the store
		$bookings = [...$bookings, item];
	};

	const deleteBooking = (item) => {
		// delete booking from the store
		$bookings = $bookings.filter(element => element != item);
	}

	/* TABLE methods */
	function getBackgroundColor(state) {
		switch (state) {
				case status.FREE:
					return "bg-green-100";
				case status.BOOKED:
					return "bg-red-100";
				case undefined:
					return "";
				default:
					const text = 'Invalid argument state: ' + state;
					console.error(text)
					throw new TypeError(text);
		}
	}

	function updateItemState(item, state, matrix) {
		matrix.forEach(row => {
		  // find item
			var index = row.map((cell) => cell.id).indexOf(item.id);
			// update data
			if (index !== -1) {
				row[index].status = state;
				row[index].bg = getBackgroundColor(state);
				return;
			};
		});
		return data;
	}

	/* COMPONENT methods */
	function bookItem(item, matrix) {
		switch (item.status) {
			case status.BOOKED:
				data = updateItemState(item, status.FREE, matrix);
				deleteBooking(item);
				break;
			case status.FREE:
				data = updateItemState(item, status.BOOKED, matrix);
				addBooking(item);
				break;
		}
	}
</script>


<section class="container mx-auto p-6 font-mono">
	<div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
	  <div class="w-full overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
					{#each columns as column}
						<th class="px-4 py-3">{column}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="bg-white">
				{#await data then matrix}
					{#each matrix as row}
					<tr class="text-gray-700">
						{#each row as cell}
							<td class="px-4 py-3 border {getBackgroundColor(cell.status)}" on:click={() => bookItem(cell, matrix)}>
								{(cell.timeString) ? cell.timeString : cell.status}
							</td>
						{/each}
					</tr>
					{/each}
				{/await}
			</tbody>
		</table>
	  </div>
	</div>
</section>


<p>
[
{#each Array.from($bookings) as item}
	({item.id}, {item.status}),
{/each}
]
</p>

<!--
<style>
	@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
</style>
-->