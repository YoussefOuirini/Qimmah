<template>
  <b-row v-if="absentees.length">
    <b-row><h1>Bekijk de afwezigheidsmeldingen</h1></b-row>
    <b-row>
      <b-pagination
        align="center"
        v-model="currentPage"
        v-if="rows > perPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="absentees"
      ></b-pagination>
      <b-table
        striped hover
        :items="absentees"
        :fields="absenteeFields"
        :per-page="perPage"
        :current-page="currentPage"
      >
      </b-table>
    </b-row>
  </b-row>
</template>

<script>
import Vue from 'vue';
import {getAllAbsentees} from "@/firebase/firebase";
import { getAge } from "../../common/getAge.js";

export default Vue.extend({
  name: "Absentees",
  mounted() {
    this.loadAbsentees()
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      absentees: [],
      absenteeFields: [{
        key: 'date',
        label: 'Datum'
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
          return getAge(value)
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
  computed: {
    rows() {
      return this.absentees.length;
    }
  },
  methods: {
    async loadAbsentees() {
      this.absentees = await getAllAbsentees();
    }
  }
})
</script>