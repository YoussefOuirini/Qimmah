<template>
  <b-container v-if="studentsLessons.length">
    <b-container
      v-for="studentLessons in studentsLessons"
      v-bind:key="studentLessons.id"
    >
      <StudentLessons
        v-if="studentLessons.lessons.length && studentLessons.student"
        :lessons="studentLessons.lessons"
        :student="studentLessons.student"
      />
    </b-container>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import StudentLessons from "./StudentLessons.vue"
  import { getLessons } from "@/firebase/firebase.js"

  export default Vue.extend({
    name: "Attendance",
    components: { StudentLessons },
    async mounted() {
      await this.loadStudents();
    },
    data() {
      return {
        studentsLessons: []
      }
    },
    methods: {
      async loadStudents() {
        const studentsLessons = await getLessons();
        const filteredStudentLessons = this.filterLessons(studentsLessons);
        this.studentsLessons = filteredStudentLessons;
      },
      filterLessons(studentsLessons) {
        return studentsLessons.map((studentLessons) => {
          const {student, lessons } = studentLessons;
          const filteredLessons = lessons.filter((lesson) => {
            if (lesson.reason && !lesson.presence) {
              return;
            }
            return lesson
          });
          return {
            student,
            lessons: filteredLessons
          }
        });
      }
    },
  })
</script>