const date = {
	TODAY: "TODAY",
	WEEK: "WEEK",
	MONTH: "MONTH",
}

const data = [
	[{id:1, time:"09:00 - 10:00"}, {id:2, status:"FREE"}, {id:3, status:"FREE"}],
  [{id:4, time:"10:00 - 11:00"}, {id:5, status:"FREE"}, {id:6, status:"FREE"}],
  [{id:7, time:"11:00 - 13:00"}, {id:8, status:"FREE"}, {id:9, status:"FREE"}],
  [{id:10, time:"12:00 - 13:00"}, {id:11, status:"FREE"}, {id:12, status:"FREE"}],
  [{id:13, time:"13:00 - 14:00"}, {id:14, status:"FREE"}, {id:15, status:"FREE"}],
]

export function fetchBookings(date) {
	return data;
}

function wrapBookingTable(data) {

}