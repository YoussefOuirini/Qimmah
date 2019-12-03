<template>
  <b-row v-if="lessons.length && student.length">
    <h4>{{student.name.first}} {{student.name.last}} klas {{student.group}}</h4>
    <b-table
      id="studentLessons"
      bordered
      :items="lessons"
      :fields="lessonsFields"
      :per-page="perPage"
      :current-page="currentPage"
      @row-selected="onRowSelected"
    >
    </b-table>
    <b-pagination
      v-model="currentPage"
      v-if="rows > perPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="studentLessons"
    ></b-pagination>
  </b-row>
</template>

<script>
  import Vue from "vue";

  export default Vue.extend({
    name: "Attendance",
    props: ['lessons, student'],
    data() {
      return {
        currentPage: 1,
        perPage: 5,
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
    computed: {
      rows() {
        return this.lessons.length
    },
    },
    methods: {

    },
  })
</script>