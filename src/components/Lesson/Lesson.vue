<template>
  <b-row align-h="center">
    <b-row align-h="center">
      <b-form-group
        id="lesson-date"
        label="Selecteer een lesdatum om een les toe te voegen"
        label-for="lesson-date"
      ><b-form-input
          id="lesson-date"
          type="date"
          v-model="lessonDate"
          @input="loadLessons"
        ></b-form-input>
      </b-form-group>
    </b-row>
    <b-row v-if="lessonDate" >
      <b-table-simple hover caption-top outlined v-if="lessons.length">
        <caption>Voeg een les toe!</caption>
        <b-thead>
          <b-tr>
            <b-th>Naam</b-th>
            <b-th>Aanwezigheid</b-th>
            <b-th>Gedrag</b-th>
            <b-th>Huiswerk gemaakt?</b-th>
            <b-th colspan="3">Huiswerk</b-th>
            <b-th colspan="3">Opmerkingen</b-th>
            <b-th>Paraaf</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <StudentLesson
            ref="studentLessons"
            v-for="lesson in lessons"
            :key="lesson.id" :lesson="lesson"
          />
        </b-tbody>
      </b-table-simple>
      <b-form-textarea 
        v-if="lessons.length"
        v-model='groupHomework'
        max-rows="8"
        placeholder="Schrijf het huiswerk van de klas op."
      ></b-form-textarea>
      <br>
      <b-button
        v-if="lessons.length"
        class="my-3 mx-auto"
        @click="addLessons"
        :disabled="sendingLesson"
        variant="primary">Les toevoegen
      </b-button>
    </b-row>
    <b-row><h5>{{lessonsRes}}</h5></b-row>
  </b-row>
</template>

<script>
  import Vue from "vue";
  import { writeLessons, getDateLessons } from "@/firebase/firebase";
  import StudentLesson from "../StudentLesson/StudentLesson.vue";

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
      lessonsRes: '',
      lessons: [],
      sendingLesson: false
    }
  },
  methods: {
    async loadLessons() {
      const date = this.lessonDate;
      const lessons = await getDateLessons(date, this.students);
      this.lessons = lessons;
      const groupHomework = lessons[0].lesson.groupHomework;
      this.loadGroupHomework(groupHomework);
    },
    loadGroupHomework(groupHomework) {
      if (groupHomework) {
        this.groupHomework = groupHomework;
      } else {
        this.groupHomework = '';
      }
    },
    async addLessons() {
      this.sendingLesson = true;
      const lessons = this.getLessons();
      try {
        const batchResponse = await writeLessons(lessons);
        if (batchResponse.success) {
          this.lessonsRes = "Les succesvol opgeslagen!";
          this.loadLessons();
        } else {
          this.lessonsRes = "Er is is iets misgegaan! Probeer het opnieuw!";
        }
      } catch (e) {
        this.lessonsRes = `Er is is iets misgegaan! ${e}`;
      } finally {
        this.sendingLesson = false;
      }
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
            timestamp: Date.now(),
            signedOff: false
          }
        };
      });
      return lessons;
    }
  }
})
</script>