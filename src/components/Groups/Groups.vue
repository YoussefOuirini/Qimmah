<template>
  <b-container>
    <b-container>
      <b-form-group
        id="group"
        description="De naam zal worden toegevoegd aan de klassen."
        label="Creëer een nieuwe klas."
        label-for="group"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
      >
        <b-input-group class="mt-3">
          <b-form-input id="group" v-model="groupName" :state="state" trim></b-form-input>
          <b-input-group-append>
            <b-button @click="addGroup" variant="primary" :disabled="groupAlreadyExists">Klas toevoegen</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-container>
    <Teachers v-if="groups.length && users.length" v-bind:groups="groups" v-bind:users="users" @reloadGroups="loadGroups"/>
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
  </b-container>
</template>

<script>
  module.exports = require("./Groups.js");
</script>