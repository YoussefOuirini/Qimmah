<template>
  <b-row v-if="registrations.length">
    <h1>Voeg studenten toe aan klassen</h1>
      <b-table
        id="students"
        ref="studentsTable"
        :items="registrations"
        :fields="studentsFields"
        striped hover
      >
        <template v-slot:cell(group)="data">
          <p>{{data.item.group}}</p>
          <b-form inline>
            <b-form-select size="sm" v-model="selectedGroupForStudent" :options="groups" text-field="groupName">
              <template v-slot:first>
                <option :value="null" disabled>-- Selecteer een klas --</option>
              </template>
            </b-form-select>
            <b-button @click="addRegistrationToGroup(registration)" size="sm"> Toevoegen aan klas</b-button>
          </b-form>
        </template>
      </b-table>
  </b-row>
</template>

<script>
import Vue from 'vue';
import { getAge } from "@/common/getAge.js";
import { writeStudentToGroup, updateRegistration, removeStudentFromGroups } from "@/firebase/firebase.js";

export default Vue.extend({
  name: "Students",
  props: ['registrations', 'groups'],
  data() {
    return {
      studentsFields: [{
        key: "name",
        label: "Naam",
        formatter: (value) => {
          return `${value.first} ${value.last}`
        }
      }, {
        key: "education",
        label: "Onderwijs"
      }, {
        key: "birthDate",
        label: "Leeftijd",
        formatter: (value) => {
          if (!value) return 'Leeftijd onbekend';
          return getAge(value);
        },
      }, {
        key: 'phoneNumber',
        label: 'Telefoonnummer'
      }, {
        key: 'email',
        label: 'Email'
      },
      {
        key: 'group',
        label: 'Klas'
      }]
    }
  },
  methods: {
    calculatedAge(date) {
      if (date) {
        return getAge(date)
      }
    },
    async addRegistrationToGroup(registration) {
      await removeStudentFromGroups(registration, this.groups);
      await writeStudentToGroup(registration, this.selectedGroupForStudent);
      await updateRegistration(registration, this.selectedGroupForStudent);
      await this.reloadRegistrations();
    },
    reloadRegistrations() {
      this.$emit('reloadRegistrations', true);
    }
  }
})
</script>