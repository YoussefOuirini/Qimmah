<template>
  <b-container>
    <b-table-simple hover responsive>
      <caption>Voeg een les toe!</caption>
      <b-thead>
        <b-tr>
          <b-th>Naam</b-th>
          <b-th>Gedrag</b-th>
          <b-th>Aanwezigheid</b-th>
          <b-th>Huiswerk</b-th>
        </b-tr>
      </b-thead>
    </b-table-simple>
  </b-container>
</template>

<script>
import Vue from "vue";
import { writeLessons } from "../../firebase";

export default Vue.extend({
  name: "Lesson",
  props: ["students"],
  methods: {
    addLessons() {
      writeLessons()
    }
  }
})
</script>