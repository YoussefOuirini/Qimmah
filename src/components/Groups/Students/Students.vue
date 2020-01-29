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
      },{
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
    reloadRegistrations() {
      this.$emit('reloadRegistrations', true);
    }
  }
})
</script>