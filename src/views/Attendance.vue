<template>
  <b-container>

  </b-container>
</template>

<script>
  import Vue from "vue";
  import { getLessons } from "../firebase.js"

  export default Vue.extend({
    name: "Attendance",
    async mounted() {
      await this.loadStudents()
    },
    data() {
      return {
        students: []
      }
    },
    methods: {
      async loadStudents() {
        this.students = await getLessons();
      }
    }
  })
</script>