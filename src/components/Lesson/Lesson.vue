<template>
  <b-container>
    <b-table-simple hover responsive>
      <caption>Voeg een les toe!</caption>
      <b-thead>
        <b-tr>
          <b-th>Naam</b-th>
          <b-th>Gedrag</b-th>
          <b-th>Aanwezigheid</b-th>
          <b-th>Huiswerk gemaakt?</b-th>
          <b-th>Huiswerk</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <StudentLesson ref="studentLessons" v-for="student in students" v-bind:key="student.id" v-bind:student="student" />
      </b-tbody>
      <b-tfoot></b-tfoot>
    </b-table-simple>
    <b-button @click="addLessons" variant="primary">Les toevoegen</b-button>
  </b-container>
</template>

<script>
import Vue from "vue";
import { writeLessons } from "../../firebase";
import StudentLesson from "../StudentLesson/StudentLesson.vue"

export default Vue.extend({
  name: "Lesson",
  components: {
    StudentLesson
  },
  props: ["students"],
  methods: {
    addLessons() {
      const lessons = this.getLessons();
      console.log(lessons)
      // writeLessons(this.lessons);
    },
    getLessons() {
      const lessons = this.$refs.studentLessons.map(studentLesson => {
        return studentLesson.$data;
      });
      return lessons;
    }
  }
})
</script>