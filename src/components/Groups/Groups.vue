<template>
  <b-container v-if="isLoaded">
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
    <b-table
      id="groups"
      ref="groupsTable"
      v-if="groups.length"
      striped hover selectable
      select-mode="single"
      :items="groups"
      :fields="groupFields"
      @row-selected="onRowSelectedGroup"
    ></b-table>
    <b-form v-if="selectedGroupForTeacher" inline>
      <b-form-select
        v-model="selectedTeacher"
        :options="teachers"
        text-field="email"
        value-field="email"
      >
        <template v-slot:first>
          <option :value="null" disabled>-- Selecteer een leraar --</option>
        </template>
      </b-form-select>
      <b-button @click="addTeacher" size="sm">Leraar Toevoegen aan klas</b-button>
    </b-form><br>
    <b-container v-if="registrations.length">
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
        <b-button @click="addStudentToGroup" size="sm">{{selectedStudent.firstName}} {{selectedStudent.lastName}} toevoegen aan klas</b-button>
      </b-form><br>
    </b-container>
  </b-container>
</template>

<script>
  module.exports = require("./Groups.js");
</script>