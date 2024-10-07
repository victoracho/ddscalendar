<script setup lang="ts">
import { RouterView } from "vue-router";
import { useRouter } from 'vue-router'

import SideNav from "./components/SideNav.vue";
import { ref, reactive, watch, computed, defineProps, onMounted } from "vue";
import { useCalendarStore } from "./stores/calendar";
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { checkEvent, getDoctors } from './services/eventService'

const date = ref(new Date())
const calendarStore = useCalendarStore()
const { status, currentDeal, quantity, deal } = storeToRefs(calendarStore)
const activeSubstatus = ref(false)
const activeDoctor = ref(false)
const activeSalon = ref(false)
const { selectedSubstatus, selectedDoctorName, selectedSalon } = storeToRefs(calendarStore)
const props = defineProps(['user', 'deal'])

const toggleSubstatus = () => {
  activeSubstatus.value = true
}
const toggleDoctor = () => {
  activeDoctor.value = true
}
const toggleSalon = () => {
  activeSalon.value = true
}

const setSubstatusColor = (color, colorName) => {
  calendarStore.selectedSubstatus = color
  calendarStore.colorSubstatus = colorName
  activeSubstatus.value = false
}
const setDoctor = (id, name) => {
  calendarStore.selectedDoctorName = name
  calendarStore.selectedDoctorId = id
  activeDoctor.value = false
}

const setSalon = (name) => {
  calendarStore.selectedSalon = name
  activeSalon.value = false
}

const selectorSubstatus = computed(() => (!calendarStore.colorSubstatus ? 'Select a Substatus' : '<span style="background: ' + calendarStore.selectedSubstatus + '"></span> ' + calendarStore.colorSubstatus))
const selectorDoctor = computed(() => (!calendarStore.selectedDoctorName ? 'Select a Doctor' : '<span></span> ' + calendarStore.selectedDoctorName))
const selectorSalon = computed(() => (!calendarStore.selectedSalon ? 'Select a Salon' : '<span></span> ' + calendarStore.selectedSalon))

const dateClicked = (date: string) => {
  calendarStore.getCalendarApi && calendarStore.getCalendarApi.gotoDate(date)
}
const router = useRouter()
calendarStore.status.items =
  [
    {
      hex: '#00afc7',
      name: 'Evaluation',
      checked: true
    },
    {
      hex: '#10e5fc',
      checked: true,
      name: 'Follow Up'
    },
    {
      hex: '#bd7ac9',
      checked: true,
      name: 'Hyperbaric Chamber'
    },
    {
      hex: '#e89b06',
      checked: true,
      name: 'Labs'
    },
    {
      hex: '#e97090',
      checked: true,
      name: 'Massage'
    },
    {
      hex: '#00ff00',
      checked: true,
      name: 'Post-op'
    },
    {
      hex: '#fff300',
      checked: true,
      name: 'Pre-op appt'
    },
    {
      hex: '#f69ac1',
      checked: true,
      name: 'Pre-op surgery'
    },
    {
      hex: '#b57051',
      checked: true,
      name: 'Surgery'
    },
    {
      hex: '#7b03fc',
      checked: false,
      name: 'Missing-appointment'
    },
  ]


watch(calendarStore.status, () => {
  calendarStore.getCalendarApi.refetchEvents()
})

watch(selectedSalon, () => {
  calendarStore.getCalendarApi.refetchEvents()
})

watch(selectedDoctorName, () => {
  calendarStore.getCalendarApi.refetchEvents()
})

watch(selectedSubstatus, () => {
  calendarStore.getCalendarApi.refetchEvents()
})
onMounted(() => {
  // Aquí puedes usar la API de Bitrix24 si es necesario
  router.push('/')
  checkEvent()
  calendarStore.doctors = getDoctors()
  calendarStore.salons =
    [
      {
        name: 'All Salons'
      },
      {
        name: 'salon 1'
      },
      {
        name: 'salon 2'
      },
    ]
})
</script>
<template>
  <b-row>
    <b-col cols="12" class="bg-secondary text-white col-xxl-2">
      <side-nav msg="Design Calendar">
        <template v-slot:content>
          <vue-date-picker v-model="date" inline auto-apply :enable-time-picker="false"
            @date-update="dateClicked"></vue-date-picker>
        </template>
      </side-nav>
      <BCol cols="12">
        <div id="color-picker">
          <div class="wrapper-dropdown">
            <span @click="toggleSubstatus()" v-html="selectorSubstatus"></span>
            <ul class="dropdown" v-show="activeSubstatus">
              <li v-for="color in calendarStore.substatus" @click="setSubstatusColor(color.hex, color.name)">
                <span :style="{ background: color.hex }"></span> {{ color.name }}
              </li>
            </ul>
          </div>
        </div>
      </BCol>
      <br>
      <BCol cols="12">
        <div id="color-picker">
          <div class="wrapper-dropdown">
            <span @click="toggleDoctor()" v-html="selectorDoctor"></span>
            <ul class="dropdown" v-show="activeDoctor">
              <li v-for="doctor in calendarStore.doctors" @click="setDoctor(doctor.id, doctor.name)">
                {{ doctor.name }}
              </li>
            </ul>
          </div>
        </div>
      </BCol>
      <br>
      <BCol cols="12">
        <div id="color-picker">
          <div class="wrapper-dropdown">
            <span @click="toggleSalon()" v-html="selectorSalon"></span>
            <ul class="dropdown" v-show="activeSalon">
              <li v-for="salon in calendarStore.salons" @click="setSalon(salon.name)">
                {{ salon.name }}
              </li>
            </ul>
          </div>
        </div>
      </BCol>
      <br>
      <fieldset color-scheme="light">
        <label for="default-light" v-for="stat in status.items">
          <input :style="{ 'accent-color': stat.hex }" type="checkbox" id="accented-light" :checked="stat.checked"
            @click="stat.checked = !stat.checked">
          <span v-if="stat.name == 'Evaluation'">
            {{ stat.name }} ({{ quantity['evaluation'] }})
          </span>
          <span v-if="stat.name == 'Follow Up'">
            {{ stat.name }} ({{ quantity['follow up'] }})
          </span>
          <span v-if="stat.name == 'Hyperbaric Chamber'">
            {{ stat.name }} ({{ quantity['hyperbaric chamber'] }})
          </span>
          <span v-if="stat.name == 'Labs'">
            {{ stat.name }} ({{ quantity['labs'] }})
          </span>
          <span v-if="stat.name == 'Massage'">
            {{ stat.name }} ({{ quantity['massage'] }})
          </span>
          <span v-if="stat.name == 'Post-op'">
            {{ stat.name }} ({{ quantity['post-op'] }})
          </span>
          <span v-if="stat.name == 'Pre-op appt'">
            {{ stat.name }} ({{ quantity['pre-op appt'] }})
          </span>
          <span v-if="stat.name == 'Pre-op surgery'">
            {{ stat.name }} ({{ quantity['pre-op appt'] }})
          </span>
          <span v-if="stat.name == 'Surgery'">
            {{ stat.name }} ({{ quantity['surgery'] }})
          </span>
          <span v-if="stat.name == 'Missing-appointment'">
            {{ stat.name }} ({{ quantity['missing-appointment'] }})
          </span>
        </label>
      </fieldset>
    </b-col>
    <b-col cols="12" class="vh-100 p-4 col-xxl-10">
      <b-container fluid tag="main" class="h-100">
        <RouterView />
      </b-container>
    </b-col>
  </b-row>
</template>
<style scoped lang="scss">
.accented {
  accent-color: deeppink;
}

input {
  --size: 1rem;
  block-size: var(--size);
  inline-size: var(--size);
}

label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}

[color-scheme="light"] {
  color-scheme: light;
}

fieldset {
  border: 1px solid hsl(0 0% 50%);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

* {
  box-sizing: border-box;
  margin: 0;
}

html {
  block-size: 100%;
}

body {
  min-block-size: 100%;
  font-family: system-ui, sans-serif;

  display: grid;
  place-content: center;
  gap: 1rem;
}

@media (min-width: 480px) {
  body {
    grid-auto-flow: column;
  }
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
</style>
