import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import listPlugin from '@fullcalendar/list'
import type { FullCalendar as F } from '@/interfaces'
import { handleDateClick, handleClick, handleSelect } from './functions/calendarManipulator'
import { useCalendarStore } from '@/stores/calendar'
import events from './eventService'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import moment from "moment";

export const openModal = () => {
  const calendarStore = useCalendarStore()
  const { setModal } = calendarStore
  setModal()
}
export const loading = () => {
  const calendarStore = useCalendarStore()
  const { setLoading } = calendarStore
  setLoading()
}
export const calendarOptions: F.CalendarOptions = {
  plugins: [
    dayGridPlugin,
    interactionPlugin,
    timeGridPlugin,
    bootstrap5Plugin,
    listPlugin,
  ],
  themeSystem: 'bootstrap5',
  initialView: 'timeGridDay',
  height: "100%",
  //locales: allLocales,
  //locale: enLocale, // 'fr'
  nowIndicator: true,
  navLinks: true,
  weekNumbers: true,
  weekText: 'W-	',
  selectable: true,
  dayMaxEvents: true,
  timeZone: 'America/New_York',
  eventStartEditable: true,

  eventRemove(arg) {
    console.log('remove---', arg)
  },
  headerToolbar: {
    start:
      'dayGridYear,dayGridMonth,timeGridWeek,timeGridDay,timeGridFive listWeek,listMonth',
    center: 'title',
    end: 'addEvent prevYear,prev,today,next,nextYear',
  },
  buttonIcons: {
    prev: 'arrow-left-square',
    prevYear: 'box-arrow-left',
    next: 'arrow-right-square',
    nextYear: 'box-arrow-right',
  },
  views: {
    timeGridFive: {
      type: 'timeGrid',
      duration: {
        days: 7,
      },
      buttonText: 'Work days',
      weekends: false
    },
    timeGridDay: {
      titleFormat: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
      },
    },
    listWeek: {
      buttonText: 'List Week',
    },
    listMonth: {
      buttonText: 'List Month',
    },
  },
  monthStartFormat: {
    month: 'long',
    day: 'numeric',
  },
  customButtons: {
    addEvent: {
      text: 'Add',
      click: () => openModal()
    }
  },
  eventClick: handleClick,
  dateClick: handleDateClick,
  select: handleSelect,
  editable: false,
  datesSet: () => {
    const calendarStore = useCalendarStore()
    if (calendarStore.getCalendarApi) {
      calendarStore.getCalendarApi.refetchEvents()
    }
  },
  //initialEvents: 'http://localhost/dds/appointments.php',
  eventSources: [
    ...events
  ],
  loading: function(bool) {
    if (bool) {
      loading()
    } else {
      loading()
    }
  },
  eventDidMount: (info) => {
    const dateCreated = moment(info.event._def.extendedProps.date_created).format('DD/MM/YYYY HH:mm:ss')
    tippy(info.el, {
      content: 'Paciente: ' + info.event.title + "\n" + 'Substatus: ' + info.event._def.extendedProps.substatus + "\n" + 'Usuario de creacion: ' + info.event._def.extendedProps.user + "\n" + 'Telefono: ' + info.event._def.extendedProps.cellphone + "\n" + 'Fecha de creacion: ' + dateCreated + "\n" + 'Usuario de modificacion: ' + info.event._def.extendedProps.user_modified + "\n" + 'Fecha de modificacion: ' + info.event._def.extendedProps.date_modified,
      placement: 'top',
      theme: 'light',
    });
  }
}
