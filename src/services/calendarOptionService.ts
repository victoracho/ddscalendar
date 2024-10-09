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
import 'moment-timezone';

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
  timeZone: 'America/New_York',
  //locales: allLocales,
  //locale: enLocale, // 'fr'
  nowIndicator: true,
  navLinks: true,
  weekNumbers: true,
  weekText: 'W-	',
  selectable: true,
  dayMaxEvents: true,
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
    console.log(info.timeText)
    const dateCreated = moment(info.event._def.extendedProps.date_created).tz('America/New_York').format('DD/MM/YYYY HH:mm')
    const dateModified = moment(info.event._def.extendedProps.date_modified).tz('America/New_York').format('DD/MM/YYYY HH:mm')
    const start = moment(info.event.start).format('DD/MM/YYYY') + ' ' + info.timeText
    const calendarStore = useCalendarStore()
    let doctor = 'not specified'
    if (info.event._def.extendedProps.doctor) {
      doctor = calendarStore.doctors.filter(elem => elem.id == info.event._def.extendedProps.doctor)
      doctor = doctor[0].name
    }
    tippy(info.el, {
      content: 'Paciente: ' + info.event.title + "\n" + 'Doctor: ' + doctor + "\n" + 'Salon: ' + info.event._def.extendedProps.salon + "\n" + 'Status: ' + info.event._def.extendedProps.status + "\n" + 'Substatus: ' + info.event._def.extendedProps.substatus + "\n" + 'Status anterior: ' + info.event._def.extendedProps.previous_status + "\n" + 'Usuario de creacion: ' + info.event._def.extendedProps.user + "\n" + 'Telefono: ' + info.event._def.extendedProps.phone + "\n" + 'Fecha de creacion: ' + dateCreated + "\n" + 'Fecha de Modificacion: ' + dateModified + "\n" + 'Usuario de modificacion: ' + info.event._def.extendedProps.user_modified + "\n" + 'Fecha de modificacion: ' + info.event._def.extendedProps.date_modified + "\n" + 'Fecha: ' + start + "\n",
      placement: 'top',
      theme: 'light',
    });
  }
}
