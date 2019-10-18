<template>
  <b-container>
    <h1>Bekijk de afwezigheidsmeldingen</h1>
  </b-container>
</template>

<script>
import Vue from 'vue';
import {getAllAbsentees} from "../../firebase";

export default Vue.extend({
  name: "Absentees",
  mounted() {
    this.loadAbsentees()
  },
  data() {
    return {
      absentees: []
    }
  },
  methods: {
    loadAbsentees() {
      this.absentees = getAllAbsentees();
    }
  }
})
</script>