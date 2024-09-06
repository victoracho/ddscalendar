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
        name: 'Blue'
      },
      {
        hex: '#f09707',
        name: 'Orange'
      },
      {
        hex: '#41f007',
        name: 'Green'
      },
      {
        hex: '#808080',
        name: 'Gray'
      },
      {
        hex: '#8c2800',
        name: 'Red'
      },
      {
        hex: '#d9a4e0',
        name: 'Pink'
      },
    ],
  )
  const quantity = ref(
    {
      'free eval': 0,
      'evaluation': 0,
      'emergency': 0,
      'vip': 0,
      're-evaluation': 0,
    }
  )

  const setAddedEvents = async (
    value: CustomEvent | string | number,
    type: string
  ) => {
    switch (type) {
      case 'add':
        const add = axios.post('http://localhost/dds/sendEvent.php',
          {
            event: value,
            user: currentUser.value,
            deal_id: deal_id.value,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(function(response) {
            alert(response.data.message)
            location.replace(location.href)
          })
          .catch(() => {
            alert('an error ocurred')
          })
        break
      case 'edit':
        const edit = axios.post('http://localhost/dds/editEvent.php',
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
            location.replace(location.href)
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
