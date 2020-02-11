<template>
  <b-row>
    <h1>Bekijk de afwezigheidsmeldingen</h1>
    <b-col lg="6" class="my-1">
      <b-form-group
        label="Filter"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        label-for="filterInput"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Typ in om te zoeken"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Klaren</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col sm="7" md="6" class="my-1">
      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="absentees"
        class="my-0"
      ></b-pagination>
    </b-col>
    <b-table
      striped hover
      sort-by="date"
      sort-desc
      :busy="isBusy"
      :sort-compare="sort"
      :items="absentees"
      :fields="absenteeFields"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      @filtered="onFiltered"
      :tbody-tr-class="rowClass"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </b-row>
</template>

<script>
import Vue from 'vue';
import {getAllAbsentees} from "@/firebase/firebase";
import { getAge } from "../../common/getAge.js";
import { getTimeStamp, getLessonDate, sortDates } from "../../common/date.js";

export default Vue.extend({
  name: "Absentees",
  mounted() {
    this.loadAbsentees();
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      rows: 1,
      filter: null,
      isBusy: false, 
      absentees: [],
      absenteeFields: [{
        key: 'date',
        label: 'Datum',
        sortable: true,
        formatter: (value) => {
          const timeStamp = getTimeStamp(value);
          return getLessonDate(timeStamp);
        }
      }, {
        key: "name",
        label: "Naam",
        formatter: (value) => {
          return `${value.first} ${value.last}`
        }
      }, {
        key: "education",
        label: "Onderwijs"
      }, {
        key: "group",
        label: "Klas"
      }, {
        key: "birthDate",
        label: "Leeftijd",
        formatter: (value) => {
          if (!value) return 'Leeftijd onbekend';
          return getAge(value);
        },
      }, {
        key: 'phoneNumber',
        label: 'Telefoonnummer'
      }, {
        key: 'email',
        label: 'Email'
      },{
        key: 'group',
        label: 'Klas'
      }, {
        key: 'absences',
        label: 'Afwezigheid',
        formatter: (absences) => {
          const absence = absences[0].absence;
          let absenceText = `Afwezig`;
          if (absence && absence.reason) {
            absenceText += ` vanwege ${absence.reason}`;
          }
          if (absence && absence.remarks) {
            absenceText += ` met als reden: ${absence.remarks}`;
          }
          return absenceText;
        }
      }],
    }
  },
  methods: {
    toggleBusy() {
      this.isBusy = !this.isBusy
    },
    async loadAbsentees() {
      this.toggleBusy();
      this.absentees = await getAllAbsentees();
      this.rows = this.absentees.length;
      this.toggleBusy();
    },
    rowClass(item) {
      if (!item) return;
      if (item.absences[0].absence && item.absences[0].absence.reason === 'overige') return 'table-warning';
      if (item.absences[0].presence === 'afwezig') return 'table-danger';
    },
    onFiltered(filteredItems) {
      this.rows = filteredItems.length;
      this.currentPage = 1;
    },
    sort(aRow, bRow, key) {
      sortDates(aRow, bRow, key);
    }
  }
})
</script>