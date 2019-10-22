<template>
  <b-container v-if="absentees.length">
    <h1>Bekijk de afwezigheidsmeldingen</h1>
    <b-table
      striped hover
      :items="absentees"
      :fields="absenteeFields"
    >
      
    </b-table>
  </b-container>
</template>

<script>
import Vue from 'vue';
import {getAllAbsentees} from "../../firebase";
import { getAge } from "../../common/getAge.js";

export default Vue.extend({
  name: "Absentees",
  mounted() {
    this.loadAbsentees()
  },
  data() {
    return {
      absentees: [],
      absenteeFields: [{
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
        key: 'group',
        label: 'Klas'
      }, {
        key: 'absence',
        label: 'Afwezigheid',
        formatter: (absences) => {
          let absencesText = "";
          absences.forEach((absence) => {
            const absenceText = `${absence.date} ${absence.presence} ${absence.reasonOfAbsence} ${absence.reasonOfAbsenceRemarks} \n`
            absencesText += absenceText;
          })
          return absencesText;
        }
      }],
    }
  },
  methods: {
    async loadAbsentees() {
      this.absentees = await getAllAbsentees();
      // console.log(this.absentees);
    }
  }
})
</script>