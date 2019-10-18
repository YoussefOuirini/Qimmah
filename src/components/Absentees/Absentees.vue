<template>
  <b-container v-if="absentees.length">
    <h1>Bekijk de afwezigheidsmeldingen</h1>
    {{absentees}}
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
    async loadAbsentees() {
      this.absentees = await getAllAbsentees();
    }
  }
})
</script>