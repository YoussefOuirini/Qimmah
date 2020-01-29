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
        <b-thead>
          <b-tr>
            <b-th>Naam</b-th>
            <b-th>Onderwijs</b-th>
            <b-th>Leeftijd</b-th>
            <b-th>Klas</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="registration in registrations" v-bind:key="registration.id">
            <b-td> {{registration.name.first}} {{registration.name.last}}</b-td>
            <b-td >{{registration.education}}</b-td>
            <b-td>{{calculatedAge(registration.birthDate)}}</b-td>
            <StudentGroup :registration="registration" :groups="groups" @reloadRegistration="reloadRegistrations"/>
          </b-tr>
        </b-tbody>
      </b-table>
  </b-row>
</template>

<script>
import Vue from 'vue';
import StudentGroup from './StudentGroup.vue';
import { getAge } from "@/common/getAge.js";
import { writeStudentToGroup, updateRegistration, removeStudentFromGroups } from "@/firebase/firebase.js";

export default Vue.extend({
  name: "Students",
  components: {
    StudentGroup
  },
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