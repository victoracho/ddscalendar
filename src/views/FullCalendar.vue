<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import EventModal from '@/components/EventModal.vue'
import Autocomplete from '@/components/Autocomplete.vue'
import { calendarOptions } from '@/services/calendarOptionService'
import { useCalendarStore } from '@/stores/calendar';

//import moment from "moment";
import axios from 'axios'
import Vue3BasicAutocomplete from 'vue3-basic-autocomplete'
import debounce from "lodash/debounce"

const calendarStore = useCalendarStore()
const fullcalendar = ref()
const result = ref('')

const clickEvent = () => {
  calendarStore.currentDeal = result.value
  calendarStore.getCalendarApi && calendarStore.getCalendarApi.gotoDate(calendarStore.currentDeal.start)
}

const classEvent = (evnt) => {
  if (calendarStore.currentDeal) {
    return calendarStore.currentDeal.deal_id == evnt ? 'my-1 px-1 text-truncate glow' : 'my-1 px-1 text-truncate'
  }
  return 'my-1 px-1 text-truncate'
}

const getItems = (name) => {
  const response = axios.get('https://dental.dasoddscolor.com/searchAppt.php?name=' + name)
    .then((response) => {
      const data = response.data
      items.value = data
    })
}


watch(fullcalendar, () => {
  if (fullcalendar.value) {
    calendarStore.setCalendarApi(fullcalendar.value.getApi())
    if (calendarStore.currentDeal) {
      calendarStore.getCalendarApi && calendarStore.getCalendarApi.gotoDate(calendarStore.currentDeal.start)
    }
  }
})

</script>
<template>
  <BCol cols="6">
    <h2>Deal: {{ calendarStore.deal_name }} </h2>
    <label> Search Events </label>
    <br>
    <Autocomplete />
  </BCol>
  <br>
  <FullCalendar :options="calendarOptions" ref="fullcalendar">
    <template #eventContent="arg">
      <h6 :class="classEvent(arg.event._def.extendedProps.deal_id)"
        :style="{ 'background-color': arg.event.backgroundColor }">
        <i>
          <span class="dot" :style="{ 'background-color': arg.event.extendedProps.substatusColor }"></span>
        </i>
        <span :style="{ 'color': 'black', 'font-weight': 'bold', 'pointer': 'cursor' }">
          &nbsp; {{ arg.event.title }}
        </span>
      </h6>
    </template>
  </FullCalendar>
  <event-modal />
</template>
<style>
.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}

.fc-event {
  cursor: pointer !important;
}

.glow {
  -webkit-box-shadow: 0 0 20px blue;
  -moz-box-shadow: 0 0 20px blue;
  box-shadow: 0 0 20px blue;
}

.tippy-content {
  white-space: pre-line !important;
}
</style>
