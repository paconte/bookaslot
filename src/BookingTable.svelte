<script>
	import { bookings, selectedDate } from './stores.js';
	import {findIndex} from './service.js';

	export let data;

	let columns = ["Time", "Pista 1", "Pista 2"]
	let currentData;
	let index;

	const status = {
		FREE: "FREE",
		BOOKED: "BOOKED",
	}

	/* STORE subscriptions */
	selectedDate.subscribe(value => {
		index = findIndex(data, value);
		currentData = data[index].data;
	});

	/* STORE methods */
	const addBooking = (item) => {
		// add booking to the store
		$bookings = [...$bookings, item];
	};

	const deleteBooking = (item) => {
		// delete booking from the store
		$bookings = $bookings.filter(element => element != item);
	}

	/* COMPONENT methods */
	function getBackgroundColor(state) {
		let result;

		switch (state) {
			case status.FREE:
				result = "bg-green-100";
				break;
			case status.BOOKED:
				result = "bg-red-100";
				break;
			case undefined:
				result = "";
				break;
			default:
				const text = 'Invalid argument state: ' + state;
				console.error(text)
				throw new TypeError(text);
		}

		return result;
	}

	function updateItemState(item, state) {
		currentData.forEach(row => {
		  // find item
			var index = row.map((cell) => cell.id).indexOf(item.id);
			// update data
			if (index !== -1) {
				row[index].status = state;
				row[index].bg = getBackgroundColor(state);
				return;
			};
		});
		currentData = currentData;
	}

	function bookItem(item) {
		switch (item.status) {
			case status.BOOKED:
				updateItemState(item, status.FREE);
				deleteBooking(item);
				break;
			case status.FREE:
				updateItemState(item, status.BOOKED);
				addBooking(item);
				break;
		}
	}

</script>

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
					{#each currentData as row}
					<tr class="text-gray-700">
						{#each row as cell}
							<td on:click={() => bookItem(cell)} class="px-4 py-3 border {getBackgroundColor(cell.status)}">
								{(cell.timeString) ? cell.timeString : cell.status}
							</td>
						{/each}
					</tr>
					{/each}
			</tbody>
		</table>
	</div>
</div>


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