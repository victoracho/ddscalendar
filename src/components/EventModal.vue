<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { addHours, format } from "date-fns";
import moment from "moment";
import { useCalendarStore } from '@/stores/calendar';
import { ref, watch, computed } from 'vue';
const calendarStore = useCalendarStore()
const { modal, selectedSlot, currStatus, currSubstatus, currentDeal, deal, currentEvent } = storeToRefs(calendarStore)
const { setModal, setAddedEvents, setSelectedSlot } = calendarStore
const eventTitle = ref('')
const activeStatus = ref(false)
const activeSubstatus = ref(false)
//  more fields 
const amount = ref(null)
const invoice_number = ref('')
const more_invoices = ref(false)
const transportation = ref(false)
const lodging = ref(false)

const status = ref(
  [
    {
      hex: '#00afc7',
      name: 'Evaluation'
    },
    {
      hex: '#10e5fc',
      name: 'Follow up'
    },
    {
      hex: '#bd7ac9',
      name: 'Hyperbaric Chamber'
    },
    {
      hex: '#e89b06',
      name: 'Labs'
    },
    {
      hex: '#0092cc',
      name: 'Vip'
    },
    {
      hex: '#e97090',
      name: 'Massage'
    },
    {
      hex: '#00ff00',
      name: 'Post-op'
    },
    {
      hex: '#fff300',
      name: 'Pre-op appt'
    },
    {
      hex: '#b57051',
      name: 'Pre-op Surgery'
    },
    {
      hex: '#86b100',
      name: 'Surgery'
    },
    {
      hex: '#7b03fc',
      name: 'Missing-appointment'
    },
  ],
)
const substatus = ref(
  [
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

const startDateTime = ref<string | Date | null>(new Date())
const endDateTime = ref<string | Date | null>(addHours(new Date(), 1))
const contentText = ref('')
const selectedSubStatus = ref('')
const selectedStatus = ref('')
const colorSubstatus = ref('')
const colorStatus = ref('')
const error = ref(null)
const none = ref(null)
const titleState = computed(() => (eventTitle.value?.length > 2 ? true : false))
const amountState = computed(() => (amount.value?.length > 0 ? true : false))
const selectorSubstatus = computed(() => (!selectedSubStatus.value ? 'Select a Substatus' : '<span style="background: ' + selectedSubStatus.value + '"></span> ' + colorSubstatus.value))
const selectorStatus = computed(() => (!selectedStatus.value ? 'Select a Status' : '<span style="background: ' + selectedStatus.value + '"></span> ' + colorStatus.value))
const userCreated = ref(null)
const userModified = ref(null)
const dateCreated = ref(null)
const dateModified = ref(null)
const toggleSubstatus = () => {
  activeSubstatus.value = true
}
const toggleStatus = () => {
  activeStatus.value = true
}
const setSubstatusColor = (color, colorName) => {
  selectedSubStatus.value = color
  colorSubstatus.value = colorName
  activeSubstatus.value = false
  currSubstatus.value = colorName
}

const setStatusColor = (color, colorName) => {
  selectedStatus.value = color
  colorStatus.value = colorName
  activeStatus.value = false
  currStatus.value = colorName
}

const addEvent = () => {
  error.value = null;
  if (!currSubstatus.value && !currStatus.value) {
    error.value = 'you have to select an status and a substatus'
  }

  if (!transportation.value && !lodging.value && !none.value) {
    error.value = 'you have to select a tranportation option'
  }

  if (!error.value) {
    setAddedEvents({
      substatus: currSubstatus.value.toLowerCase(),
      BackgroundColor: currStatus.value.toLowerCase(),
      start: startDateTime.value,
      end: endDateTime.value,
      title: eventTitle.value,
      text: contentText.value,
      amount: amount.value,
      invoice_number: invoice_number.value,
      transportation: transportation.value,
      lodging: lodging.value,
      more_invoices: more_invoices.value,
    }, 'add')
    closeModal()
  }
}
const editEvent = () => {
  if (!currSubstatus.value && !currStatus.value) {
    error.value = 'you have to select an status and a substatus'
  }
  if (currSubstatus.value && currStatus.value) {
    setAddedEvents({
      substatus: currSubstatus.value.toLowerCase(),
      BackgroundColor: currStatus.value.toLowerCase(),
      start: startDateTime.value,
      end: endDateTime.value,
      title: eventTitle.value,
      text: contentText.value,
      amount: amount.value,
      invoice_number: invoice_number.value,
      transportation: transportation.value,
      lodging: lodging.value,
      more_invoices: more_invoices.value,
    }, 'edit')
    closeModal()
  }
}
const deleteEvent = () => {
  if (!currSubstatus.value && !currStatus.value) {
    error.value = 'you have to select an status and a substatus'
  }
  if (currSubstatus.value && currStatus.value) {
    setAddedEvents({
      substatus: currSubstatus.value,
      BackgroundColor: currStatus.value.toLowerCase(),
      start: startDateTime.value,
      end: endDateTime.value,
      title: eventTitle.value,
      text: contentText.value,
    }, 'delete')
    closeModal()
  }
}

const closeModal = () => {
  modal.value && setModal()
  selectedSlot.value.modal && setSelectedSlot({
    add: true,
    modal: false,
    times: {
      start: null,
      end: null
    }
  })
  eventTitle.value = ''
  userCreated.value = null
  userModified.value = null
  dateCreated.value = null
  dateModified.value = null
}

watch(() => none.value, () => {
  if (none.value == true) {
    transportation.value = false
    lodging.value = false
  }
})
watch(() => lodging.value, () => {
  if (lodging.value == true) {
    if (none.value) {
      none.value = false
    }
  }
})
watch(() => transportation.value, () => {
  if (transportation.value == true) {
    none.value = false
  }
})

watch(() => selectedSlot.value.modal, () => {
  if (selectedSlot.value.modal) {
    // cuando le dan click para agregar
    if (selectedSlot.value.add) {
      contentText.value = null
      selectedSubStatus.value = null
      selectedStatus.value = null
      colorSubstatus.value = null
      colorStatus.value = null
      userCreated.value = null
      userModified.value = null
      dateCreated.value = null
      dateModified.value = null
      // campos adicionales
      amount.value = null
      invoice_number.value = null
      lodging.value = null
      transportation.value = null
      more_invoices.value = null

      startDateTime.value = selectedSlot.value.times.start
      endDateTime.value = selectedSlot.value.times.end
    }
    // cuando le dan click a un evento  
    if (!selectedSlot.value.add) {
      contentText.value = calendarStore.currentEvent.event.extendedProps.comment
      userCreated.value = calendarStore.currentEvent.event.extendedProps.user
      userModified.value = calendarStore.currentEvent.event.extendedProps.user_modified
      dateCreated.value = calendarStore.currentEvent.event.extendedProps.date_created
      dateModified.value = calendarStore.currentEvent.event.extendedProps.date_modified
      // campos adicionales 
      amount.value = calendarStore.currentEvent.event.extendedProps.amount
      invoice_number.value = calendarStore.currentEvent.event.extendedProps.invoice_number

      lodging.value = false
      if (calendarStore.currentEvent.event.extendedProps.lodging == '1') {
        lodging.value = true
      }

      transportation.value = false
      if (calendarStore.currentEvent.event.extendedProps.transportation == '1') {
        transportation.value = true
      }

      more_invoices.value = false
      if (calendarStore.currentEvent.event.extendedProps.more_invoices == '1') {
        more_invoices.value = true
      }
      // si no tiene ninguna de las opciones   
      if (!transportation.value && !lodging.value) {
        none.value = true;
      }

      let color = null
      let colorName = null
      //Substatus 
      if (calendarStore.currentEvent.event.extendedProps.substatus == 'confirmed') {
        color = '#00759A'
        colorName = 'Confirmed'
        setSubstatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.substatus == 'unconfirmed') {
        color = '#f09707'
        colorName = 'Unconfirmed'
        setSubstatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.substatus == 'lm + tm') {
        color = '#41f007'
        colorName = 'LM + TM'
        setSubstatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.substatus == 'n/a') {
        color = '#808080'
        colorName = 'N/A'
        setSubstatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.substatus == 'phone disconnected') {
        color = '#8c2800'
        colorName = 'Phone Disconnected'
        setSubstatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.substatus == 'no phone / email') {
        color = '#d9a4e0'
        colorName = 'No phone /email'
        setSubstatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.substatus == 'not specified') {
        color = '#F0F0F0'
        colorName = 'Not Specified'
        setSubstatusColor(color, colorName)
      }

      //STATUS 
      if (calendarStore.currentEvent.event.extendedProps.status == 'evaluation') {
        color = '#00afc7'
        colorName = 'Evaluation'
        setStatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.status == 'follow up') {
        color = '#10e5fc'
        colorName = 'Follow up'
        setStatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.status == 'hyperbaric chamber') {
        color = '#bd7ac9'
        colorName = 'Hyperbaric chamber'
        setStatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.status == 'labs') {
        color = '#e89b06'
        colorName = 'Labs'
        setStatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.status == 'massage') {
        color = '#e97090'
        colorName = 'Massage'
        setStatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.status == 'post-op') {
        color = '#00ff00'
        colorName = 'Post-op'
        setStatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.status == 'pre-op appt') {
        color = '#fff300'
        colorName = 'Pre-op appt'
        setStatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.status == 'pre-op surgery') {
        color = '#b57051'
        colorName = 'Pre-op surgery'
        setStatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.status == 'surgery') {
        color = '#86b100'
        colorName = 'Surgery'
        setStatusColor(color, colorName)
      }
      if (calendarStore.currentEvent.event.extendedProps.status == 'missing-appointment') {
        color = '#7b03fc'
        colorName = 'Missing Appointment'
        setStatusColor(color, colorName)
      }
      // to do substatus and title  
      eventTitle.value = calendarStore.currentEvent.event.title
      var start = moment(calendarStore.currentEvent.event.startStr).utcOffset(-240)
      start = start.format('ddd MMM DD YYYY HH:mm:ss') + ' GMT' + start.format('Z')

      var end = moment(calendarStore.currentEvent.event.endStr).utcOffset(-240)
      end = end.format('ddd MMM DD YYYY HH:mm:ss') + ' GMT' + end.format('Z')

      startDateTime.value = calendarStore.currentEvent.event.startStr
      endDateTime.value = calendarStore.currentEvent.event.endStr
    }
  }
})
</script>

<template>
  <teleport to="body">
    <div class="modal-wrapper" v-if="modal || selectedSlot.modal">
      <BCard header="Calendar Modal" header-tag="header" class="fc-modal text-center bg-white fs-5 p-0 min"
        title="Add Event" style="min-width: 400px;">
        <BCardBody class="fs-6 pt-0">
          <div role="group" class="text-start">
            <BCol cols="12" class="p-1">
              <label for="title">Title:</label>
              <BFormInput id="title" v-model="eventTitle" placeholder="Enter event title" :state="titleState" trim />
              <BFormInvalidFeedback id="input-live-feedback"> Enter at least 3 letters </BFormInvalidFeedback>
            </BCol>
            <BCol cols="12" class="p-1">
              <label for="title">Amount:</label>
              <BFormInput id="title" v-model="amount" type="number" placeholder="Enter Amount" :state="amountState"
                trim />
              <BFormInvalidFeedback id="input-live-feedback"> Enter at least 0 </BFormInvalidFeedback>
            </BCol>
            <BCol cols="12" class="p-1">
              <label for="title">Invoice Number:</label>
              <BFormInput id="title" v-model="invoice_number" placeholder="Enter invoice number" trim />
              <input type="checkbox" id="accented-light" v-model="more_invoices" :checked="more_invoices">
              <span>
                More Invoices
              </span>
            </BCol>
            <BCol cols="12" class="p-1">
              <label for="start">Start:</label>
              <VueDatePicker aria-label="start" v-model="startDateTime" placeholder="Pick the start time" />
            </BCol>
            <BCol cols="12" class="p-1">
              <label for="end">Until:</label>
              <VueDatePicker aria-label="end" v-model="endDateTime" placeholder="Pick the End time" />
            </BCol>
            <BCol cols="12" class="p-1">
              <BFormTextarea id="textarea" v-model="contentText" placeholder="Enter a description..." rows="3"
                max-rows="6" />
            </BCol>
            <BCol cols="12" class="p-1">
              <label for="end">Status:</label>
              <div id="color-picker">
                <div class="wrapper-dropdown">
                  <span @click="toggleStatus()" v-html="selectorStatus"></span>
                  <ul class="dropdown" v-show="activeStatus">
                    <li v-for="color in status" @click="setStatusColor(color.hex, color.name)">
                      <span :style="{ background: color.hex }"></span> {{ color.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </BCol>
            <BCol cols="12" class="p-1">
              <label for="end">Sub-Status:</label>
              <div id="color-picker">
                <div class="wrapper-dropdown">
                  <span @click="toggleSubstatus()" v-html="selectorSubstatus"></span>
                  <ul class="dropdown" v-show="activeSubstatus">
                    <li v-for="color in substatus" @click="setSubstatusColor(color.hex, color.name)">
                      <span :style="{ background: color.hex }"></span> {{ color.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </BCol>
            <BCol cols="12" class="p-1">
              <input type="checkbox" id="accented-light" v-model="lodging" :checked="lodging">
              <span>
                Lodging
              </span>
              <input type="checkbox" id="accented-light" v-model="transportation" :checked="transportation">
              <span>
                Transportation
              </span>
              <input type="checkbox" id="accented-light" v-model="none"
                :checked="!lodging && !transportation ? true : false">
              <span>
                None
              </span>
            </BCol>
            <BCol cols="12" class="p-1" v-if="!selectedSlot.add">
              <label for="end">Link to deal:</label>
              <a target="_blank"
                :href="'https://daso.dds.miami/crm/deal/details/' + currentEvent.event.extendedProps.deal_id + '/'">
                Click Here
              </a>
            </BCol>
            <div>
              <BCol cols="12" class="p-1">
                <label for="end">User created: {{ userCreated }}</label>
              </BCol>
              <BCol cols="12" class="p-1">
                <label for="end">Date created: {{ dateCreated }}</label>
              </BCol>
              <BCol cols="12" class="p-1">
                <label for="end">User Modified: {{ userModified }}</label>
              </BCol>
              <BCol cols="12" class="p-1">
                <label for="end">Date Modified: {{ dateModified }} </label>
              </BCol>
              <div style="color: red;">
                {{ error }}
              </div>
            </div>
          </div>
        </BCardBody>
        <template v-slot:footer>
          <div tag="footer" class="d-flex justify-content-end">
            <BButtonGroup>
              <BButton variant="primary" @click="closeModal()">Close</BButton>
              <BButton variant="success" @click="addEvent()" v-if="selectedSlot.add">Add</BButton>
              <BButton variant="warning" @click="editEvent()" v-if="!selectedSlot.add">Edit</BButton>
            </BButtonGroup>
          </div>
        </template>
      </BCard>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.modal-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #0000006a;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
}

.fc-modal {
  position: fixed;
  max-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fc-event-main {
  font-weight: bold;
  color: black !important;
}

.fc .fc-popover {
  z-index: 500 !important;
}

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

select option:before {
  content: '\2022';
  color: red;
  display: block;
  height: 5;
  width: 5;
  left: -0.7em;
  top: 1.2em;
  position: relative;
}

.dot {
  height: 15px;
  width: 15px;
  background-color: #08258c;
  border-radius: 50%;
  display: inline-block;
  border-color: black;

}

.wrapper-dropdown {
  position: relative;
  width: 200px;
  background: #FFF;
  color: #2e2e2e;
  outline: none;
  cursor: pointer;
}

.wrapper-dropdown>span {
  width: 100%;
  display: block;
  border: 1px solid #ababab;
  padding: 5px;
}

.wrapper-dropdown>span>span {
  padding: 0 12px;
  margin-right: 5px;
}

.wrapper-dropdown>span:after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  right: 16px;
  top: calc(50% + 4px);
  margin-top: -6px;
  border-width: 6px 6px 0 6px;
  border-style: solid;
  border-color: #2e2e2e transparent;
}

.wrapper-dropdown .dropdown {
  position: absolute;
  z-index: 9999;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  font-weight: normal;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  border: 1px solid #ababab;
  border-top: 0;
}

.wrapper-dropdown .dropdown li {
  display: block;
  margin: 0;
  text-decoration: none;
  color: #2e2e2e;
  padding: 5px;
  cursor: pointer;
}

.wrapper-dropdown .dropdown li>span {
  padding: 0 12px;
  margin-right: 5px;
}

.wrapper-dropdown .dropdown li:hover {
  background: #eee;
  cursor: pointer;
}

.modal-vue3-content {
  overflow: visible !important;
}

.delete:hover {
  background-color: gray;
}
</style>
