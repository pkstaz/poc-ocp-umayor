document.addEventListener('DOMContentLoaded', function () {
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: ['interaction', 'dayGrid'],
		defaultDate: '2022-02-01',
		editable: true,
		eventLimit: true, // allow "more" link when too many events


		initialView: 'dayGridMonth',
		headerToolbar: {
			left: 'prev,next Hoy',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		},
		locales: 'es',


		events: [
			{
				title: 'All Day Event',
				start: '2022-02-01'
			},
			{
				title: 'Long Event',
				start: '2020-02-07',
				end: '2022-02-10'
			},
			{
				groupId: 999,
				title: 'Repeating Event',
				start: '2022-02-09T16:00:00'
			},
			{
				groupId: 999,
				title: 'Repeating Event',
				start: '2022-02-16T16:00:00'
			},
			{
				title: 'Conference',
				start: '2020-02-11',
				end: '2022-02-13'
			},
			{
				title: 'Meeting',
				start: '2020-02-12T10:30:00',
				end: '2022-02-12T12:30:00'
			},
			{
				title: 'Lunch',
				start: '2022-02-12T12:00:00'
			},
			{
				title: 'Meeting',
				start: '2022-02-12T14:30:00'
			},
			{
				title: 'Happy Hour',
				start: '2022-02-12T17:30:00'
			},
			{
				title: 'Dinner',
				start: '2022-02-12T20:00:00'
			},
			{
				title: 'Birthday Party',
				start: '2022-02-13T07:00:00'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: '2022-02-28'
			}
		]
	});

	calendar.render();
});
