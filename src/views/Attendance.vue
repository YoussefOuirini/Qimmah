<template>
  <b-container v-if="studentLessons">
    <b-container
      v-for="studentLesson in studentLessons"
      v-bind:key="studentLesson.id"
    >
      <b-row v-if="studentLesson.lessons.length">
        <h5>{{studentLesson.student.name.first}} {{studentLesson.student.name.last}} klas {{studentLesson.student.group}}</h5>
        <b-table
          bordered
          :items="studentLesson.lessons"
          :fields="lessonsFields"
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
        studentLessons: [],
        lessonsFields: [{
          key: "date",
          label: "Lesdatum",
        }, {
          key: "behaviour",
          label: "Gedrag"
        }, {
          key: "groupHomework",
          label: "Klassenhuiswerk"
        }, {
          key: "studentHomework",
          label: "Individuele Huiswerk"
        }, {
          key: "presence",
          label: "Aanwezigheid"
        }, {
          key: "madeHomework",
          label: "Huiswerk gemaakt?"
        }, {
          key: "remarks",
          label: "Opmerkingen"
        }]
      }
    },
    methods: {
      async loadStudents() {
        this.studentLessons = await getLessons();
      }
    }
  })
</script>