<script setup lang="ts">
import { RouterView } from "vue-router";
import { useRouter } from 'vue-router'

import SideNav from "./components/SideNav.vue";
import { ref, reactive, watch, computed, defineProps, onMounted } from "vue";
import { useCalendarStore } from "./stores/calendar";
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { checkEvent } from './services/eventService'

const date = ref(new Date())
const calendarStore = useCalendarStore()
const { status, currentDeal, quantity, deal } = storeToRefs(calendarStore)
const activeSubstatus = ref(false)
const { selectedSubstatus } = storeToRefs(calendarStore)
const props = defineProps(['user', 'deal'])

const toggleSubstatus = () => {
  activeSubstatus.value = true
}
const setSubstatusColor = (color, colorName) => {
  calendarStore.selectedSubstatus = color
  calendarStore.colorSubstatus = colorName
  activeSubstatus.value = false
}
const selectorSubstatus = computed(() => (!calendarStore.colorSubstatus ? 'Select a Substatus' : '<span style="background: ' + calendarStore.selectedSubstatus + '"></span> ' + calendarStore.colorSubstatus))
const dateClicked = (date: string) => {
  calendarStore.getCalendarApi && calendarStore.getCalendarApi.gotoDate(date)
}
const router = useRouter()
calendarStore.status.items =
  [
    {
      hex: '#bbecf1',
      name: 'Free Eval',
      checked: true
    },
    {
      hex: '#fff55a',
      checked: true,
      name: 'Re-evaluation'
    },
    {
      hex: '#f10057',
      checked: true,
      name: 'Evaluation'
    },
    {
      hex: '#e89b06',
      checked: true,
      name: 'Emergency'
    },
    {
      hex: '#0092cc',
      checked: true,
      name: 'Vip'
    },
    {
      hex: '#683696',
      checked: true,
      name: 'Missing-appointment'
    },
    {
      hex: '#039e13',
      checked: true,
      name: 'Payed'
    },
    {
      hex: '#ad260e',
      checked: true,
      name: 'Not Payed'
    },
    {
      hex: '#808080',
      checked: false,
      name: 'Deleted'
    },

  ]

watch(calendarStore.status, () => {
  calendarStore.getCalendarApi.refetchEvents()
})

watch(selectedSubstatus, () => {
  calendarStore.getCalendarApi.refetchEvents()
})
onMounted(() => {
  // Aquí puedes usar la API de Bitrix24 si es necesario
  router.push('/')
  checkEvent()
})
</script>
<template>
  <b-row>
    <b-col cols="12" class="bg-secondary text-white col-xxl-2">
      <side-nav msg="New Jersey Miami">
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
      <fieldset color-scheme="light">
        <label for="default-light" v-for="stat in status.items">
          <input :style="{ 'accent-color': stat.hex }" type="checkbox" id="accented-light" :checked="stat.checked"
            @click="stat.checked = !stat.checked">
          <span v-if="stat.name == 'Free Eval'">
            {{ stat.name }} ({{ quantity['free eval'] }})
          </span>
          <span v-if="stat.name == 'Evaluation'">
            {{ stat.name }} ({{ quantity['evaluation'] }})
          </span>
          <span v-if="stat.name == 'Re-evaluation'">
            {{ stat.name }} ({{ quantity['re-evaluation'] }})
          </span>
          <span v-if="stat.name == 'Emergency'">
            {{ stat.name }} ({{ quantity['emergency'] }})
          </span>
          <span v-if="stat.name == 'Vip'">
            {{ stat.name }} ({{ quantity['vip'] }})
          </span>
          <span v-if="stat.name == 'Missing-appointment'">
            {{ stat.name }} ({{ quantity['missing-appointment'] }})
          </span>
          <span v-if="stat.name == 'Payed'">
            {{ stat.name }} ({{ quantity['payed'] }})
          </span>
          <span v-if="stat.name == 'Not Payed'">
            {{ stat.name }} ({{ quantity['not payed'] }})
          </span>
          <span v-if="stat.name == 'Deleted'">
            {{ stat.name }} ({{ quantity['deleted'] }})
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
