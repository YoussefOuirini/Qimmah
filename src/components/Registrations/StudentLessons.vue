<template>
  <b-row v-if="!lessons">
    <h1>Nog geen lessen</h1>
  </b-row>
  <b-row v-else-if="lessons">
    <div class="overflow-auto">
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
        :busy="isBusy"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Aan het laden...</strong>
          </div>
        </template>
        <template v-slot:cell(signoff)="row">
          <b-form-checkbox
            :ref="row.index"
            :checked="row.item.signedOff"
            value=true
            unchecked-value=false
            @change="update(row.item, row.index)"
          >
            Paraaf
          </b-form-checkbox>
        </template>
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
  import { getLessonsOf, update } from "@/firebase/firebase";

  export default Vue.extend({
    name: "StudentLessons",
    props: ['student'],
    async mounted() {
      this.isBusy = true;
      await this.loadLessons();
      this.isBusy = false;
    },
    data() {
      return {
        isBusy: false,
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
        }, {
          key: "signoff",
          label: "Aftekenen"
        }]
      }
    },
    computed: {
      rows() {
        if (this.lessons && this.lessons.length) {
          return this.lessons.length;
        } else {
          return 0;
        }
      }
    },
    methods: {
      async loadLessons() {
        const lessons = await getLessonsOf(this.student);
        const filteredStudentLessons = this.filterLessons(lessons);
        this.lessons = filteredStudentLessons;
      },
      filterLessons(lessons) {
        if (!lessons) { return; }
        return lessons.filter((lesson) => {
          if (lesson.absence && lesson.absence.reason && !lesson.presence) {
            return;
          }
          return lesson;
        });
      },
      async update(lesson, index) {
        const signedOff = (this.$refs[index].localChecked === "true");
        const student = this.student;
        const lessonUpdate = Object.assign(lesson, { signedOff })
        await update(student, lessonUpdate);
      },
      sort(aRow, bRow, key) {
        sortDates(aRow, bRow, key);
      }
    }
  })
</script>