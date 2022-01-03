<script>
	import { bookings } from './stores.js';
	import { fetchBookings } from './service.js';
	let columns = ["Time", "Pista 1", "Pista 2"]
	let data = fetchBookings('');

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
					return "bg-success";
				case status.BOOKED:
					return "bg-danger";
				case undefined:
					return "";
				default:
					const text = 'Invalid argument state: ' + state;
					console.error(text)
					throw new TypeError(text);
		}
	}

	function updateItemState(item, state) {
		data.forEach(row => {
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
	function bookItem(item) {
		switch (item.status) {
			case status.BOOKED:
				data = updateItemState(item, status.FREE);
				deleteBooking(item);
				break;
			case status.FREE:
				data = updateItemState(item, status.BOOKED);
				addBooking(item);
				break;
		}
	}
</script>

<table class="table table-bordered border-primary">
	<tr>
		{#each columns as column}
			<th>{column}</th>
		{/each}
	</tr>

	{#each data as row}
		<tr>
			{#each row as cell}
				<td class="{getBackgroundColor(cell.status)}" on:click={() => bookItem(cell)}>
					{(cell.time) ? cell.time : cell.status}
				</td>
			{/each}
		</tr>
	{/each}
</table>

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