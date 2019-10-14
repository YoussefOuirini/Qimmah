<template>
  <b-container v-if="teachersGroups.length">
    <b-form-select
      v-model="selectedGroupName"
      :options="teachersGroups"
      text-field="groupName"
      value-field="groupName"
    >
      <template v-slot:first>
        <option :value="null" disabled>-- Selecteer een klas --</option>
      </template>
    </b-form-select>
    <b-table
      v-if="selectedGroupName"
      :items="students"
    >
    </b-table>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import firebase from "firebase";
  import { getGroupsOf } from "../firebase.js";

  export default Vue.extend({
    name: "ClassRoom",
    mounted() {
      this.getTeachersGroups()
    },
    data() {
      return {
        teachersGroups: [],
        selectedGroupName: '',
        studentFields: [{
          key: 'address',
          label: 'Adres'
        }]
      }
    },
    computed: {
      students() {
        return this.teachersGroups.find((group) => {
          return group.groupName === this.selectedGroupName;
        }).students
      },
    },
    methods: {
      async getTeachersGroups() {
        this.teachersGroups = await getGroupsOf(firebase.auth().currentUser.email);
      }
    }
  })
</script>