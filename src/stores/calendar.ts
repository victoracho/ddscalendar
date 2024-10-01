import { ref, reactive, computed, inject } from 'vue'
import { createPinia, defineStore } from 'pinia'
import type { CustomEvent, SelectedSlot } from '@/interfaces'
import axios from 'axios'

export const pinia = createPinia()
export const useCalendarStore = defineStore('calendar', () => {
  const calendarApi = ref()
  const currentEvent = ref(null)
  const loading = ref(null)
  const deal = ref(null)
  const deal_id = ref(null)
  const deal_name = ref('')
  const currentDeal = ref(null)
  const currentUser = ref(null)
  const currStatus = ref(null)
  const currSubstatus = ref(null)
  const selectedSubstatus = ref('')
  const colorSubstatus = ref('All Substatus')
  const modal = ref(false)
  const refetch = ref(false)
  const addedEvents = ref<CustomEvent[]>([])
  const selectedSlot = ref<SelectedSlot>({
    add: true,
    modal: false,
    times: {
      start: null,
      end: null
    }
  })
  const status = reactive({
    items: []
  })
  const getCalendarApi = computed(() => calendarApi.value)
  const getAddedEvents = computed(() => addedEvents.value)
  const getSelectedSlot = computed(() => selectedSlot.value)

  const setCalendarApi = (value: any) => {
    calendarApi.value = value
  }
  const setModal = () => {
    modal.value = !modal.value
  }
  const setLoading = () => {
    loading.value = !loading.value
  }
  const substatus = ref(
    [
      {
        hex: ' ',
        name: 'All Substatus'
      },
      {
        hex: '#00759A',
        name: 'Confirmed'
      },
      {
        hex: '#f09707',
        name: 'Unconfirmed'
      },
      {
        hex: '#41f007',
        name: 'LM + TM'
      },
      {
        hex: '#808080',
        name: 'N/A'
      },
      {
        hex: '#8c2800',
        name: 'Phone Disconnected'
      },
      {
        hex: '#d9a4e0',
        name: 'No phone / email'
      },
      {
        hex: '#F0F0F0',
        name: 'Not Specified'
      },
    ],
  )
  const quantity = ref(
    {
      'evaluation': 0,
      'follow up': 0,
      'hyperbaric chamber': 0,
      'labs': 0,
      'massage': 0,
      'post-op': 0,
      'pre-op appt': 0,
      'pre-op surgery': 0,
      'surgery': 0,
      'missing-appointment': 0,
    }
  )

  const setAddedEvents = async (
    value: any,
    type: string
  ) => {
    console.log(value)
    switch (type) {
      // case 'add':
      //   const add = axios.post('https://daso.dasoddscolor.com/sendEvent.php',
      //     {
      //       event: value,
      //       user: currentUser.value,
      //       deal_id: deal_id.value,
      //     },
      //     {
      //       headers: { 'Content-Type': 'application/json' },
      //     })
      //     .then(function(response) {
      //       alert(response.data.message)
      //       getCalendarApi.value && getCalendarApi.value.refetchEvents()
      //     })
      //     .catch(() => {
      //       alert('an error ocurred')
      //     })
      //   break
      case 'edit':
        const edit = axios.post('https://daso.dasoddscolor.com/editEvent.php',
          {
            event: value,
            user: currentUser.value,
            event_id: currentEvent.value.event._def.publicId,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(function(response) {
            alert(response.data.message)
            getCalendarApi.value && getCalendarApi.value.refetchEvents()
          })
          .catch(() => {
            alert('an error ocurred')
          })
        break
      default:
        break
    }
    addedEvents.value.push()
  }

  const setSelectedSlot = (value: any) => {
    selectedSlot.value = value
  }
  const setCurrentEvent = (value: any) => {
    currentEvent.value = value
  }
  return {
    calendarApi,
    modal,
    status,
    quantity,
    loading,
    refetch,
    currentDeal,
    deal,
    deal_id,
    deal_name,
    currentUser,
    currStatus,
    currSubstatus,
    selectedSubstatus,
    colorSubstatus,
    currentEvent,
    setCurrentEvent,
    selectedSlot,
    addedEvents,
    getCalendarApi,
    getAddedEvents,
    getSelectedSlot,
    setCalendarApi,
    setModal,
    setLoading,
    setAddedEvents,
    setSelectedSlot,
    substatus
  }
})
