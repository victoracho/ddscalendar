import moment from "moment"
import axios from 'axios'
import type { FullCalendar as F } from '@/interfaces'
import { useCalendarStore } from "../stores/calendar";
import { storeToRefs } from 'pinia'
import { inject } from 'vue'

export const getData = async (url: string) => {
  const calendarStore = useCalendarStore()
  const response = await fetch(url)
  let data = await response.json()
  calendarStore.quantity = data.quantity
  return data.results
}

export const fetchEvent = async ({
  range,
}: {
  range: string[]
}) => {
  const calendarStore = useCalendarStore()
  const { selectedSubstatus } = storeToRefs(calendarStore)
  const checked = calendarStore.status.items.filter((x) => x.checked).map((x) => x.name).join("', '")
  let substatus = selectedSubstatus.value
  substatus = substatus.substring(1)
  const eventsForYear = await getData("https://dental.dasoddscolor.com/appointments.php?range=" + range + "&status=" + checked + "&substatus=" + substatus)
  return eventsForYear
}

export const checkEvent = async (deal) => {
  const deal_id = inject('deal')
  const user = inject('user')
  const calendarStore = useCalendarStore()
  calendarStore.currentUser = user
  calendarStore.deal_id = deal_id
  const response = await axios.get('https://dental.dasoddscolor.com/verifyAppt.php?deal_id=' + deal_id)
  const data = response.data
  if (data.message == 'found') {
    calendarStore.currentDeal = data.result
    calendarStore.deal = data.result
    calendarStore.getCalendarApi && calendarStore.getCalendarApi.gotoDate(calendarStore.currentDeal.start)
  }
}

export default [
  {
    events: (info, successCallback, failureCallback) => {
      return fetchEvent({
        range: [info.startStr, info.endStr],
      })
    },
  },
] as F.EventSourceInput[]
