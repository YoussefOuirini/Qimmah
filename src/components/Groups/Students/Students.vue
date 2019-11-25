<template>
  <b-container v-if="registrations.length">
    <h1>Voeg studenten toe aan klassen</h1>
      <b-table-simple
        id="students"
        ref="studentsTable"
        striped hover
      >
        <b-thead>
          <b-tr>
            <b-th>Naam</b-th>
            <b-th>Onderwijs</b-th>
            <b-th>Klas</b-th>
            <b-th>Leeftijd</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="registration in registrations" v-bind:key="registration.id">
            <b-td> {{registration.name.first}} {{registration.name.last}}</b-td>
            <b-td>{{registration.education}}</b-td>
            <b-td>{{registration.group}}</b-td>
            <b-td>{{registration.birthDate}}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <b-form v-if="selectedStudent && groups.length" inline>
        <b-form-select v-model="selectedGroupForStudent" :options="groups" text-field="groupName">
          <template v-slot:first>
          <option :value="null" disabled>-- Selecteer een klas --</option>
          </template>
        </b-form-select>
        <b-button @click="addStudentToGroup" size="sm">{{selectedStudent.name.first}} {{selectedStudent.name.last}} toevoegen aan klas</b-button>
      </b-form><br>
  </b-container>
</template>

<script>
import Vue from 'vue';
import { writeStudentToGroup, updateRegistration, removeStudentFromGroups } from "../../../firebase.js";
import { getAge } from "@/common/getAge.js";

export default Vue.extend({
  name: "Students",
  props: ['registrations', 'groups'],
  data() {
    return {
      selectedGroupForStudent: '',
      selectedStudent: ''
    }
  },
  computed: {
    age() {
      return getAge()
    }
  },
  methods: {
    async addStudentToGroup() {
      await removeStudentFromGroups(this.selectedStudent, this.groups);
      await writeStudentToGroup(this.selectedStudent, this.selectedGroupForStudent);
      await updateRegistration(this.selectedStudent, this.selectedGroupForStudent);
      await this.reloadRegistrations();
    },
    reloadRegistrations() {
      this.$emit('reloadRegistrations', true);
    }
  }
})
</script>