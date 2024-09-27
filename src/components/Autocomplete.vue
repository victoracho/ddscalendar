<template>
  <div class="autocomplete">
    <input class="autocomplete" v-model="searchQuery" @input="fetchSuggestions" type="text"
      placeholder="Escribe para buscar..." />
    <ul v-if="filteredSuggestions.length && showSuggestions">
      <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @click="selectSuggestion(suggestion)">
        <strong> Event: </strong>{{ suggestion.name ? suggestion.name.replace(/(.{11})..+/, "$1&hellip;") : '' }}
        <strong> Lead: </strong> {{ suggestion.lead_name ? suggestion.lead_name.replace(/(.{11})..+/, "$1&hellip;") :
          '' }}
        <strong> Phone: </strong> {{ suggestion.phone ? suggestion.phone.replace(/(.{11})..+/, "$1&hellip;") : '' }}
        <strong> Status: </strong> {{ suggestion.status ? suggestion.status.replace(/(.{11})..+/, "$1&hellip;") : '' }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useCalendarStore } from '@/stores/calendar';

export default {
  name: 'Autocomplete',
  setup() {
    const calendarStore = useCalendarStore();
    const searchQuery = ref('');
    const filteredSuggestions = ref([]);
    const showSuggestions = ref(true);
    // Método para hacer la solicitud HTTP y obtener las sugerencias
    const fetchSuggestions = async () => {
      if (searchQuery.value === '') {
        filteredSuggestions.value = [];
        return;
      }
      try {
        // Aquí llamamos a la API con el query
        const response = await axios.get('https://daso.dasoddscolor.com/searchAppt.php?name=' + searchQuery.value);
        filteredSuggestions.value = response.data;
        showSuggestions.value = true;
      } catch (error) {
        filteredSuggestions.value = [];
      }
    };

    const selectSuggestion = (suggestion) => {
      calendarStore.currentDeal = suggestion
      calendarStore.getCalendarApi && calendarStore.getCalendarApi.gotoDate(calendarStore.currentDeal.start)

      searchQuery.value = suggestion.name;
      showSuggestions.value = false;
    };

    return {
      searchQuery,
      filteredSuggestions,
      showSuggestions,
      fetchSuggestions,
      selectSuggestion,
    };
  }
};
</script>

<style scoped>
.autocomplete {
  width: 100%;
  max-width: 900px;
  min-width: 400px;
  box-sizing: border-box;
}

.autocomplete {
  position: relative;
  display: inline-block;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  width: 100%;
  z-index: 9999;
}

li {
  padding: 8px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}

input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>
