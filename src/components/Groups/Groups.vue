<template>
  <b-container>
    <b-form-group
      id="group"
      description="De naam zal worden toegevoegd aan de klas."
      label="Creëer een nieuwe klas."
      label-for="group"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    >
       <b-input-group class="mt-3">
         <b-form-input id="group" v-model="groupName" :state="state" trim></b-form-input>
         <b-input-group-append>
          <b-button @click="addGroup" variant="primary">Klas toevoegen</b-button>
         </b-input-group-append>
        </b-input-group>
    </b-form-group>
    <b-table v-if="isLoaded" striped hover :items="groups" :fields="groupFields"></b-table>
    <b-form inline>
      <b-form-select
        v-model="selectedGroup"
        :options="groups"
        text-field="groupName"
        value-field="groupName"
      >
        <template v-slot:first>
          <option :value="null" disabled>-- Selecteer een klas --</option>
        </template>
      </b-form-select>
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
  </b-container>
</template>

<script>
import Vue from "vue";
import { createGroup, getGroups } from "../../firebase.js"

export default Vue.extend ({
  name: "Groups",
  props: ['users'],
  mounted() {
    this.loadGroups();
  },
  data() {
    return {
      isLoaded: true,
      groupName: "",
      groups: [],
      groupFields: [{
        key: "groupName",
        label: "Klas",
      }, {
        key: "teacher",
        label: "Leraar"
      }],
      selectedGroup: '',
      selectedTeacher: ''
    }
  },
  computed: {
    state() {
      return this.groupName.length >= 4 ? true : false
    },
    invalidFeedback() {
      if (this.groupName.length > 4) {
        return ''
      } else if (this.groupName.length > 0) {
        return 'Vul minstens 4 letters in.'
      } else {
        return 'Vul iets in.'
      }
    },
    validFeedback() {
      return this.state === true ? 'Druk op klas toevoegen om de klas aan te maken!' : ''
    },
    teachers() {
      return this.users.filter((user) => {
        if (user.customClaims.teacher) {
          return user
        }
      })
    }
  },
  methods: {
    async addGroup() {
      this.isLoaded = false,
      await createGroup({groupName: this.groupName})
      await this.loadGroups();
      this.isLoaded = true
    },
    async loadGroups() {
      this.groups = await getGroups();
    },
    addTeacher() {
      console.log(this.selectedTeacher);
    }
  }
})
</script>