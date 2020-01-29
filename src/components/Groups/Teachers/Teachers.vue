<template>
  <b-row class="m-1">
    <h1>Beheer de leraar van de klas</h1>
    <b-table
      id="groups"
      ref="groupsTable"
      v-if="groups.length && users.length"
      striped hover
      :items="groups"
      :fields="groupFields"
    >
      <template v-slot:cell(teachers)="data">
        <b-row v-for="teacher in data.value" :key="teacher.email" >
          <b class="text-info">{{ teacher }}</b>
          <b-button @click="removeTeacher(teacher, data.item.groupName)" variant="danger" size="sm">Leraar Verwijderen</b-button>
        </b-row>
        <b-row>
          <b-form inline>
            <b-form-input
              v-model="teacherEmail"
              placeholder="Vul de email in"
              type="email"
            ></b-form-input>
            <b-button @click="addTeacher(data.item.groupName)" size="sm">Leraar Toevoegen aan klas</b-button>
          </b-form>
        </b-row>
      </template>
    </b-table>
  </b-row>
</template>

<script>
import Vue from "vue";
import { updateGroupTeacher, removeGroupTeacher } from "@/firebase/firebase.js"

export default Vue.extend({
  name: "Teachers",
  props: ['groups', 'users'],
  data() {
    return {
      teacherEmail: '',
      groupFields: [{
        key: "groupName",
        label: "Klas",
      }, {
        key: "teachers",
        label: "Leraren"
      }],
    }
  },
  computed: {
    teachers() {
      return this.users.filter((user) => {
        if (user.customClaims && user.customClaims.teacher) {
          return user;
        }
      })
    }
  },
  methods: {
    async addTeacher(groupName) {
      await updateGroupTeacher(this.teacherEmail, groupName);
      this.reloadGroups();
    },
    async removeTeacher(teacher, groupName) {
      await removeGroupTeacher(teacher, groupName);
      this.reloadGroups();
    },
    reloadGroups() {
      this.$emit('reloadGroups', true);
    }
  }
})
</script>