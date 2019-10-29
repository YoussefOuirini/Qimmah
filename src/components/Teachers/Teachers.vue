<template>
  <b-container>
    <h1>Beheer de leraar van de klas</h1>
    <b-table
      id="groups"
      ref="groupsTable"
      v-if="groups.length && users.length"
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
      <b-button @click="removeTeacher" variant="danger" size="sm">Leraar Verwijderen</b-button>
    </b-form><br>
  </b-container>
</template>

<script>
import Vue from "vue";
import { updateGroupTeacher, removeGroupTeacher } from "../../firebase.js"

export default Vue.extend({
  name: "Teachers",
  props: ['groups', 'users'],
  data() {
    return {
      selectedTeacher: '',
      selectedGroupForTeacher: '',
      groupFields: [{
        key: "groupName",
        label: "Klas",
      }, {
        key: "teachers",
        label: "Leraren",
        formatter: (value) => {
          if (value) {
            let teachersText = '';
            value.forEach((teacher, index) => {
              teachersText += ` ${teacher.email}`;
              if (index !== value.length-1) {
              teachersText += ` &`;
              }
            });
            return teachersText;
          }
        }
      }],
    }
  },
  computed: {
    teachers() {
      return this.users.filter((user) => {
        if (user.customClaims && user.customClaims.teacher) {
          return user
        }
      })
    }
  },
  methods: {
    onRowSelectedGroup(group) {
      this.selectedGroupForTeacher = group[0]
    },
    async addTeacher() {
      await updateGroupTeacher({email: this.selectedTeacher}, this.selectedGroupForTeacher.groupName);
      this.reloadGroups();
    },
    async removeTeacher() {
      await removeGroupTeacher({email: this.selectedTeacher}, this.selectedGroupForTeacher.groupName);
      this.reloadGroups();
    },
    reloadGroups() {
      this.$emit('reloadGroups', true);
    }
  }
})
</script>