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
      <b-tbody>
        <b-tr v-for="student in students" v-bind:key="student.phoneNumber">
          <b-td>{{student.name.first}} {{student.name.last}}</b-td>
          <b-td>
            <b-form-select v-model="behaviour">
              <option value="good">Goed</option>
              <option value="bad">Slecht</option>
            </b-form-select>
          </b-td>
          <b-td>
            <b-form-select v-model="presence">
              <option value="present">Aanwezig</option>
              <option value="late">Laat</option>
              <option value="absent">Afwezig</option>
            </b-form-select>
          </b-td>
          <b-td>
            <b-form-textarea v-model='studentHomework' placeholder="Schrijf het huiswerk van deze student op"></b-form-textarea>
          </b-td>
        </b-tr>
        <b-tr></b-tr>
      </b-tbody>
      <b-tfoot></b-tfoot>
    </b-table-simple>
  </b-container>
</template>

<script>
import Vue from "vue";
import { writeLessons } from "../../firebase";

export default Vue.extend({
  name: "Lesson",
  props: ["students"],
  data() {
    return {
      behaviour: '',
      presence: '',
      studentHomework: ''
    }
  },
  methods: {
    addLessons() {
      writeLessons()
    }
  }
})
</script>