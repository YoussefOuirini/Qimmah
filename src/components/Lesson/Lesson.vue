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
      <b-table-simple hover caption-top v-if="lessons.length">
        <caption>Voeg een les toe!</caption>
        <b-thead>
          <b-tr>
            <b-th>Naam</b-th>
            <b-th>Aanwezigheid</b-th>
            <b-th>Gedrag</b-th>
            <b-th>Huiswerk gemaakt?</b-th>
            <b-th>Huiswerk</b-th>
            <b-th>Opmerkingen</b-th>
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
      <b-form-textarea v-model='groupHomework' placeholder="Schrijf het huiswerk van de klas op."></b-form-textarea><br>
      <b-button
        class="my-3 mx-auto"
        @click="addLessons"
        :disabled="sendingLesson"
        variant="primary">Les toevoegen
      </b-button>
      <br>
      <h5>{{batchResponse}}</h5>
    </b-row>
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
      batchResponse: '',
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