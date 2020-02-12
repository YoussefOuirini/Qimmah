<template>
  <b-row v-if="registrations.length">
    <h1>Voeg studenten toe aan klassen</h1>
    <b-form-group
      label="Filter"
      label-cols-sm="3"
      label-align-sm="right"
      label-size="sm"
      label-for="filterInput"
      class="m-1"
    >
      <b-input-group size="md">
        <b-form-input
          v-model="filter"
          type="search"
          id="filterInput"
          placeholder="Naam leerling"
          class="py-1"
        ></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Klaren</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="students"
      class="m-1"
    ></b-pagination>
    <b-table
      id="students"
      ref="studentsTable"
      sort-by="group"
      :items="registrations"
      :fields="studentsFields"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      @filtered="onFiltered"
      striped hover
    >
      <template v-slot:cell(group)="data">
        <p>{{data.item.group}}</p>
        <b-form inline>
          <b-form-select size="sm" :ref="data.index" :options="groupNames" text-field="groupName">
            <template v-slot:first>
              <b-form-select-option :value="null" disabled>-- Selecteer een klas --</b-form-select-option>
            </template>
          </b-form-select>
          <b-button @click="addRegistrationToGroup(data.item, data.index)" size="sm"> Toevoegen aan klas</b-button>
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
      perPage: 5,
      currentPage: 1,
      filter: null,
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
        label: 'Klas',
        sortable: true
      }]
    }
  },
  computed: {
    rows: {
      get() {
        return this.registrations.length;
      },
      set(newValue) {
        return newValue;
      }
    },
    groupNames() {
      return this.groups.map((group) => group.groupName);
    }
  },
  methods: {
    async addRegistrationToGroup(registration, studentRef) {
      const selectedGroupForStudent = this.$refs[studentRef].localValue;
      await removeStudentFromGroups(registration, this.groups);
      await writeStudentToGroup(registration, selectedGroupForStudent);
      await updateRegistration(registration, selectedGroupForStudent);
      this.$refs[studentRef].localValue = "";
      await this.reloadRegistrations();
    },
    reloadRegistrations() {
      this.$emit('reloadRegistrations', true);
    },
    onFiltered(filteredItems) {
      this.rows = filteredItems.length;
      this.currentPage = 1;
    }
  }
})
</script>