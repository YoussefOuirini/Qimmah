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
        studentsLessons: [],
        lessonsFields: [{
          key: "date",
          label: "Lesdatum"
        }, {
          key: "presence",
          label: "Aanwezigheid"
        }, {
          key: "madeHomework",
          label: "Huiswerk gemaakt?"
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
          key: "remarks",
          label: "Opmerkingen"
        }]
      }
    },
    methods: {
      async loadStudents() {
        const studentsLessons = await getLessons();
        const filteredStudentLessons = this.filterLessons(studentsLessons);
        const sortedStudentLessons = this.sort(filteredStudentLessons);
        this.studentsLessons = sortedStudentLessons;
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
      },
      sort(studentLessons) {
        return studentLessons.map((studentLessons) => {
          const {student, lessons} = studentLessons;
          const sortedLessons = lessons.sort((lessonA, lessonB) => {
            let comparison = 0;
            if (lessonA.timestamp > lessonB.timestamp) {
              comparison = 1;
            } else if(lessonA.timestamp < lessonB.timestamp) {
              comparison = -1;
            }
            return comparison;
          });
          return {
            student,
            lessons: sortedLessons
          }
        });
      }
    },
  })
</script>