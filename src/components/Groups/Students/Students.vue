<template>
  <b-container v-if="registrations.length">
    <h1>Voeg studenten toe aan klassen</h1>
      <b-table
      id="students"
      ref="studentsTable"
      striped hover selectable
      select-mode="single"
      :items="registrations"
      :fields="registrationFields"
      @row-selected="onRowSelectedStudent"
      ></b-table>
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
      selectedStudent: '',
      registrationFields: [{
        key: "name",
        label: "Naam",
        formatter: (value) => {
          return `${value.first} ${value.last}`
        }
      }, {
        key: "education",
        label: "Onderwijs"
      }, {
        key: "group",
        label: "Klas"
      }, {
        key: "birthDate",
        label: "Leeftijd",
        formatter: (value) => {
          return getAge(value)
        }
      }]
    }
  },
  methods: {
    onRowSelectedStudent(student) {
      this.selectedStudent = student[0];
    },
    async addStudentToGroup() {
      await removeStudentFromGroups(this.selectedStudent, this.groups);
      await writeStudentToGroup(this.selectedStudent, this.selectedGroupForStudent);
      await updateRegistration(this.selectedStudent, this.selectedGroupForStudent);
      await this.loadRegistrations();
    },
  }
})
</script>