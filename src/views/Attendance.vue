<template>
  <b-container v-if="studentLessons">
    <b-container
      v-for="studentLesson in studentLessons"
      v-bind:key="studentLesson.id"
    >
      <b-row v-if="studentLesson.lessons.length">
        {{studentLesson.student.name.first}} {{studentLesson.student.name.last}} klas {{studentLesson.student.group}}
        <b-table
          :items="studentLesson.lessons"
        >
        </b-table>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import { getLessons } from "../firebase.js"

  export default Vue.extend({
    name: "Attendance",
    async mounted() {
      await this.loadStudents();
    },
    data() {
      return {
        studentLessons: []
      }
    },
    computed: {
      lessons() {
        return this.studentLessons.map((student) => student);
      }
    },
    methods: {
      async loadStudents() {
        this.studentLessons = await getLessons();
      }
    }
  })
</script>