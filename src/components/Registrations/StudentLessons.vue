<template>
  <b-row>
    <h4>{{student.name.first}} {{student.name.last}} klas {{student.group}}</h4>
    <div v-if="rows" class="overflow-auto">
      <b-table
        id="studentLessons"
        bordered
        sort-by="date"
        sort-desc
        :sort-compare="sort"
        :items="lessons"
        :fields="lessonsFields"
        :per-page="perPage"
        :current-page="currentPage"
      >
      </b-table>
      <b-pagination
        v-model="currentPage"
        v-if="rows > perPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="studentLessons"
      ></b-pagination>
    </div>
  </b-row>
</template>

<script>
  import Vue from "vue";
  import { sortDates, getTimeStamp, getLessonDate } from "@/common/date";
  import { getLessonsOf } from "@/firebase/firebase";

  export default Vue.extend({
    name: "StudentLessons",
    props: ['student'],
    async mounted() {
      await this.loadLessons();
    },
    data() {
      return {
        currentPage: 1,
        perPage: 5,
        lessons: [],
        lessonsFields: [{
          key: "date",
          label: "Lesdatum",
          sortable: true,
          formatter: (value) => {
            const timeStamp = getTimeStamp(value);
            return getLessonDate(timeStamp);
          }
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
    computed: {
      rows() {
        return this.lessons.length;
      }
    },
    methods: {
      async loadLessons() {
        const lessons = await getLessonsOf(this.student);
        const filteredStudentLessons = this.filterLessons(lessons);
        this.lessons = filteredStudentLessons;
      },
      filterLessons(lessons) {
        return lessons.filter((lesson) => {
          if (lesson.absence && lesson.absence.reason && !lesson.presence) {
            return;
          }
          return lesson;
        });
      },
      sort(aRow, bRow, key) {
        sortDates(aRow, bRow, key);
      }
    }
  })
</script>