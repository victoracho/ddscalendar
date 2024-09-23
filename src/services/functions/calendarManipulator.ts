import type { FullCalendar as F } from '@/interfaces'
import { useCalendarStore } from '@/stores/calendar'

export const handleDateClick = (arg: F.DateClickArg) => {
}
export const handleClick = (arg: F.DateClickArg) => {
  const calendarStore = useCalendarStore()
  calendarStore.setCurrentEvent(arg)
  calendarStore.setSelectedSlot({
    add: false,
    modal: true,
    times: {
      start: arg.startStr,
      end: arg.endStr
    }
  })
}

export const handleSelect = (selectionInfo: any) => {
  const calendarStore = useCalendarStore()
  calendarStore.setSelectedSlot({
    add: true,
    modal: true,
    times: {
      start: selectionInfo.startStr,
      end: selectionInfo.endStr
    }
  })
}
