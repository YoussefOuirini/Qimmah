<template>
  <b-row>
    <Teachers v-if="groups.length && users.length" v-bind:groups="groups" v-bind:users="users" @reloadGroups="loadGroups"/>
    <b-form-row v-if="groups.length && users.length" class="mx-5">
      <b-form-group
        id="group"
        label="Creëer een nieuwe klas."
        label-for="group"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
      >
        <b-input-group class="mt-3">
          <b-form-input id="group" v-model="groupName" :state="state" trim></b-form-input>
          <b-input-group-append>
            <b-button @click="addGroup" variant="success" :disabled="!state">Klas toevoegen</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-form-row>
    <Students v-if="registrations.length" v-bind:registrations="registrations" v-bind:groups="groups" @reloadRegistrations="loadRegistrations"/>
    <ImportStudentsForm @reloadRegistrations="loadRegistrations"/>
  </b-row>
</template>

<script>
  module.exports = require("./Groups.js");
</script>