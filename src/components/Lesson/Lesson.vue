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
        <StudentLesson v-for="student in students" v-bind:key="student.id" v-bind:student="student" />
      </b-tbody>
      <b-tfoot></b-tfoot>
    </b-table-simple>
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
  data() {
    return {
      behaviour: 'good',
      presence: 'present',
      madeHomework: true,
      studentHomework: ''
    }
  },
  methods: {
    addLessons() {
      writeLessons()
    }
  }
})
</script>