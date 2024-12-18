import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

window.Webflow ||= [];
window.Webflow.push(() => {
  const calendarElement = document.getElementById<HTMLDivElement>('calendar-container');
  if (!calendarElement) return;

  // console.log(calendarElement);

  const calendarEl = calendarElement;
  const events = getEvents();
  // console.log(events);

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek',
    },
    events,
  });
  calendar.render();
});

const getEvents = () => {
  const scripts = document.querySelectorAll('[data-element="event-data"]');
  // console.log(scripts);
  const events = [...scripts].map((script) => {
    const event = JSON.parse(script.textContent);
    event.start = new Date(event.start);
    event.start = new Date(event.end);
    return event;
  });
  // console.log(events);
  return events;
};
