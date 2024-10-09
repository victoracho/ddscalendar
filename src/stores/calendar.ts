import { ref, reactive, computed, inject } from 'vue'
import { createPinia, defineStore } from 'pinia'
import type { CustomEvent, SelectedSlot } from '@/interfaces'
import axios from 'axios'
import moment from "moment";

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
  const currSalon = ref(null)
  const currDoctor = ref(null)

  const selectedSubstatus = ref('')
  const selectedSalon = ref('All Salons')
  const selectedDoctorId = ref('All Doctors')
  const selectedDoctorName = ref('All Doctors')
  const colorSubstatus = ref('All Substatus')

  const modal = ref(false)
  const refetch = ref(false)
  const doctors = ref()
  const salons = ref([])
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
        hex: '#15870b',
        name: 'Simple'
      },
      {
        hex: '#f0e351',
        name: 'Combo Simple'
      },
      {
        hex: '#d4021e',
        name: 'Combo Plus'
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
    switch (type) {
      case 'add':
        if (typeof value.start == 'object') {
          const fecha = moment(value.start, "ddd MMM DD YYYY HH:mm:ss")
          const formatoOriginal = fecha.format("YYYY-MM-DDTHH:mm:ss")
          value.start = formatoOriginal
        }
        if (typeof value.end == 'object') {
          const fechaEnd = moment(value.end, "ddd MMM DD YYYY HH:mm:ss")
          const formatoOriginalEnd = fechaEnd.format("YYYY-MM-DDTHH:mm:ss")
          value.end = formatoOriginalEnd
        }
        const add = axios.post(axios.defaults.baseURL + '/sendEvent.php',
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
            getCalendarApi.value && getCalendarApi.value.refetchEvents()
          })
          .catch(() => {
            alert('an error ocurred')
          })
        break
      case 'edit':
        if (typeof value.start == 'object') {
          const fecha = moment(value.start, "ddd MMM DD YYYY HH:mm:ss")
          const formatoOriginal = fecha.format("YYYY-MM-DDTHH:mm:ss")
          value.start = formatoOriginal
        }
        if (typeof value.end == 'object') {
          const fechaEnd = moment(value.end, "ddd MMM DD YYYY HH:mm:ss")
          const formatoOriginalEnd = fechaEnd.format("YYYY-MM-DDTHH:mm:ss")
          value.end = formatoOriginalEnd
        }
        const edit = axios.post(axios.defaults.baseURL + '/editEvent.php',
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
    doctors,
    salons,
    currentUser,
    currStatus,
    currSubstatus,
    currSalon,
    currDoctor,
    selectedSubstatus,
    selectedDoctorName,
    selectedDoctorId,
    selectedSalon,
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
