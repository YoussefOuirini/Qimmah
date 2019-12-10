<template>
  <b-td>
    <p>{{registration.group}}</p>
    <b-form inline>
      <b-form-select size="sm" v-model="selectedGroupForStudent" :options="groups" text-field="groupName">
        <template v-slot:first>
          <option :value="null" disabled>-- Selecteer een klas --</option>
        </template>
      </b-form-select>
      <b-button @click="addRegistrationToGroup(registration)" size="sm"> Toevoegen aan klas</b-button>
    </b-form>
  </b-td>
</template>

<script>
import Vue from 'vue';
import { writeStudentToGroup, updateRegistration, removeStudentFromGroups } from "@/firebase/firebase.js";

export default Vue.extend({
  name: 'StudentGroup',
  props: ['registration', 'groups'],
  data() {
    return {
      selectedGroupForStudent: ''
    }
  },
  methods: {
    async addRegistrationToGroup(registration) {
      await removeStudentFromGroups(registration, this.groups);
      await writeStudentToGroup(registration, this.selectedGroupForStudent);
      await updateRegistration(registration, this.selectedGroupForStudent);
      await this.reloadRegistration();
    },
    reloadRegistration() {
      this.$emit('reloadRegistration', true);
    }
  }
})
</script>