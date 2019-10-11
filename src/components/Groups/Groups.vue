<template>
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
    <b-table 
      v-if="isLoaded && groups.length"
      striped hover
      :items="groups"
      :fields="groupFields"
    ></b-table>
    <b-form v-if="groups.length" inline>
      <b-form-select
        v-model="selectedGroupForTeacher"
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
    <b-container v-if="registrations.length">
      <b-table
        id="students"
        ref="studentsTable"
        striped hover selectable
        select-mode="single"
        :items="registrations"
        :fields="registrationFields"
        @row-selected="onRowSelected"
      >
      </b-table>
      <b-form v-if="selectedStudent && groups.length" inline>
        <b-form-select v-model="selectedGroupForStudent" :options="groups" text-field="groupName">
          <template v-slot:first>
            <option :value="null" disabled>-- Selecteer een klas --</option>
          </template>
        </b-form-select>
        <b-button @click="addStudent" size="sm">{{selectedStudent.firstName}} {{selectedStudent.lastName}} toevoegen aan klas</b-button>
      </b-form><br>
    </b-container>
  </b-container>
</template>

<script>
import Vue from "vue";
import { createGroup, getGroups, updateGroup, getAllRegistrations } from "../../firebase.js"

export default Vue.extend ({
  name: "Groups",
  props: ['users'],
  mounted() {
    this.loadGroups();
    this.loadRegistrations();
  },
  data() {
    return {
      isLoaded: true,
      groupName: "",
      groups: [],
      registrations: [],
      groupFields: [{
        key: "groupName",
        label: "Klas",
      }, {
        key: "teacher",
        label: "Leraar"
      }],
      registrationFields: [
        'firstName',
        'lastName',
        'education',
        'group',
      ],
      selectedGroupForTeacher: {},
      selectedGroupForStudent: {},
      selectedTeacher: {},
      selectedStudent: {}
    }
  },
  computed: {
    state() {
      return (this.groupName.length >= 4 && !this.groupAlreadyExists) ? true : false
    },
    invalidFeedback() {
      if (this.groupAlreadyExists) {
        return 'Klas bestaat al.'
      } else if (this.groupName.length > 4) {
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
    groupAlreadyExists() {
      return this.groups.some((group) => {
        return group.groupName === this.groupName
      })
    },
    teachers() {
      return this.users.filter((user) => {
        if (user.customClaims && user.customClaims.teacher) {
          return user
        }
      })
    }
  },
  methods: {
    async addGroup() {
      if (this.groupAlreadyExists) {
        return;
      }
      this.isLoaded = false;
      await createGroup({groupName: this.groupName});
      await this.loadGroups();
      this.isLoaded = true;
    },
    async loadGroups() {
      this.groups = await getGroups();
    },
    async loadRegistrations() {
      this.registrations = await getAllRegistrations();
    },
    async addTeacher() {
      this.isLoaded = false;
      await updateGroup({teacher: this.selectedTeacher}, this.selectedGroupForTeacher);
      await this.loadGroups();
      this.isLoaded = true;
    },
    onRowSelected(student) {
      this.selectedStudent = student[0]
    },
    async addStudent() {
      this.isLoaded = false;
      await updateGroup({student: this.selectedStudent}, this.selectedGroupForStudent)
      await this.loadGroups();
      this.isLoaded = true;
    }
  }
})
</script>