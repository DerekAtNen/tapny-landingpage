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
  const styles = window.getComputedStyle(document.body);
  // console.log(events);

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek',
    },
    events,
    eventColor: styles.getPropertyValue('--base-color-brand--green'),
    eventClick: function (info) {
      info.jsEvent.preventDefault(); // don't let the browser navigate

      if (info.event.url) {
        window.open(info.event.url);
      }
    },
  });
  calendar.render();
});

const getEvents = () => {
  const scripts = document.querySelectorAll('[data-element="event-data"]');
  // console.log(scripts);
  const events = [...scripts].map((script) => {
    const event = JSON.parse(script.textContent);
    event.start = new Date(event.start);
    event.end = new Date(event.end);
    return event;
  });
  // console.log(events);
  return events;
};
