const data = [
	//TODO: move to testing
	[{id:1, time:"09:00 - 10:00"}, {id:2, status:"FREE"}, {id:3, status:"FREE"}],
  	[{id:4, time:"10:00 - 11:00"}, {id:5, status:"FREE"}, {id:6, status:"FREE"}],
  	[{id:7, time:"11:00 - 13:00"}, {id:8, status:"FREE"}, {id:9, status:"FREE"}],
  	[{id:10, time:"12:00 - 13:00"}, {id:11, status:"FREE"}, {id:12, status:"FREE"}],
  	[{id:13, time:"13:00 - 14:00"}, {id:14, status:"FREE"}, {id:15, status:"FREE"}],
]

async function fetchReservations() {
	const url = 'http://195.201.148.68/reservations/getBookings4';
	const response = await fetch(url);
	const reservations = await response.json();
	return reservations;
}


function formatMinutes(minutes) {
	let result = minutes;
	if (minutes < 10) {
		result = "0" + minutes;
	}
	return result;
}


function formatTime(timestamp) {
	let date = new Date(timestamp);
	let minutes = formatMinutes(date.getMinutes());
	return date.getHours() + ":" + minutes;
}


export async function getReservationsTable() {
	let result = Array();
	const reservations = await fetchReservations();

	reservations.forEach(element => {
		let time =
			formatTime(element.time.init * 1000)
			+ " - "
			+ formatTime(element.time.end * 1000);
		let item = {id: -1, timeString: time};
		let row = [item];
		row = row.concat(element.items);
		result.push(row);
	});

	return result;
}