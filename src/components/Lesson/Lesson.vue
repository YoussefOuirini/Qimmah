<template>
  <b-row>
    <b-row>
      <b-form-group
        id="lesson-date"
        label="Selecteer een lesdatum om een les toe te voegen"
        label-for="lesson-date"
      ><b-form-input
          id="lesson-date"
          type= "date"
          v-model="lessonDate"
          required
        ></b-form-input>
      </b-form-group>
    </b-row>
    <b-row v-if="lessonDate" >
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
      </b-table-simple>
      <b-form-textarea v-model='groupHomework' placeholder="Schrijf het huiswerk van de klas op."></b-form-textarea><br>
      <b-button
        class="my-3 mx-auto"
        @click="addLessons"
        :disabled="sendingLesson"
        variant="primary">Les toevoegen
      </b-button>
      <br>
      {{batchResponse}}
    </b-row>
  </b-row>
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
  props: ["students", "selectedGroupName"],
  data() {
    return {
      lessonDate: '',
      groupHomework: '',
      batchResponse: '',
      sendingLesson: false
    }
  },
  methods: {
    async addLessons() {
      this.sendingLesson = true;
      const lessons = this.getLessons();
      const batchResponse = await writeLessons(lessons);
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
            groupHomework: this.groupHomework,
            date: this.lessonDate,
            timestamp: Date.now()
          }
        };
      });
      return lessons;
    }
  }
})
</script>