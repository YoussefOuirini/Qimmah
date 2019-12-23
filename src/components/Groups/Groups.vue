<template>
  <b-row>
    <Teachers v-if="groups.length && users.length" v-bind:groups="groups" v-bind:users="users" @reloadGroups="loadGroups"/>
    <b-row class="my-1">
      <b-button @click='toggleShowAddGroups' variant='primary' block class="my-1">Voeg een klas toe</b-button>
      <b-form-row>
        <b-form-group
          v-if='showGroupsInput'
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
              <b-button @click="addGroup" variant="success" :disabled="groupAlreadyExists">Klas toevoegen</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-form-row>
    </b-row>
    <Students v-if="registrations.length" v-bind:registrations="registrations" v-bind:groups="groups" @reloadRegistrations="loadRegistrations"/>
  </b-row>
</template>

<script>
  module.exports = require("./Groups.js");
</script>