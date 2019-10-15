<template>
  <b-container>
    <b-table-simple hover caption-top>
      <caption>Voeg een les toe!</caption>
      <b-thead>
        <b-tr>
          <b-th>Naam</b-th>
          <b-th>Gedrag</b-th>
          <b-th>Aanwezigheid</b-th>
          <b-th>Huiswerk gemaakt?</b-th>
          <b-th>Huiswerk</b-th>
          <b-th>Opmerkingen</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <StudentLesson ref="studentLessons" v-for="student in students" v-bind:key="student.id" v-bind:student="student" />
      </b-tbody>
      <b-tfoot></b-tfoot>
    </b-table-simple>
    <b-form-textarea v-model='groupHomework' placeholder="Schrijf het huiswerk van de klas op."></b-form-textarea><br>
    <b-button @click="addLessons" :disabled="sendingLesson" variant="primary">Les toevoegen</b-button><br>
    {{batchResponse}}
  </b-container>
</template>

<script>
import Vue from "vue";
import { writeLessons } from "../../firebase";
import { getLessonDate } from "../../common/getDate";
import StudentLesson from "../StudentLesson/StudentLesson.vue"


export default Vue.extend({
  name: "Lesson",
  components: {
    StudentLesson
  },
  props: ["students", "selectedGroupName"],
  data() {
    return {
      groupHomework: '',
      batchResponse: '',
      sendingLesson: false
    }
  },
  methods: {
    async addLessons() {
      this.sendingLesson = true;
      const lessons = this.getLessons();
      const lessonsDate = getLessonDate();
      const batchResponse = await writeLessons(lessons, lessonsDate);
      if (batchResponse.success) {
        this.batchResponse = "Les successvol opgeslagen!"
      } else {
        this.batchResponse = "Er is is iets misgegaan! Probeer het opnieuw!"
      }
      this.sendingLesson = false;
    },
    getLessons() {
      const lessons = this.$refs.studentLessons.map(studentLesson => {
        return {
          groupName: this.selectedGroupName,
          student: studentLesson.student,
          lesson: {
            behaviour: studentLesson.behaviour,
            presence: studentLesson.presence,
            madeHomework: studentLesson.madeHomework,
            studentHomework: studentLesson.studentHomework,
            remarks: studentLesson.remarks,
            groupHomework: this.groupHomework
          }
        };
      });
      return lessons;
    }
  }
})
</script>