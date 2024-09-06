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
      start: arg.start,
      end: arg.end
    }
  })
}

export const handleSelect = (selectionInfo: any) => {
  const calendarStore = useCalendarStore()
  calendarStore.setSelectedSlot({
    add: true,
    modal: true,
    times: {
      start: selectionInfo.start,
      end: selectionInfo.end
    }
  })
}
