<template>
  <b-container>
    <Teachers v-if="users.length" v-bind:groups="groups" v-bind:users="users" @reloadGroups="loadGroups"/>
    <b-form-row v-if="users.length" class="mx-5">
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
        <b-button  @click="registration($event.target)">Student inschrijven</b-button>
    <b-modal
      size="lg"
      :id="registrationModal.id"
      :ref="registrationModal.id"
      title="Nieuwe student inschrijven"
      ok-only ok-title="Niet inschrijven"
    >
      <RegistrationForm @reloadRegistrations="loadRegistrations"/>
    </b-modal>
    <Students v-if="registrations.length" v-bind:registrations="registrations" v-bind:groups="groups" @reloadRegistrations="loadRegistrations"/>
  </b-container>
</template>

<script>
  module.exports = require("./Groups.js");
</script>