<template>
  <b-container v-if="teachersGroups.length" class="p-1">
    <b-row class="p-2">
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
    </b-row>
    <b-row v-if="selectedGroupName" class="p-2">
      <b-col>
        <b-button
          block
          squared
          size="lg"
          class="p-5 w-75 m-5"
        >
          Studenten
        </b-button>
      </b-col>
      <b-col>
        <b-button
          block
          size="lg"
          class="p-5 w-75 m-5"
          squared
        >
          Les toevoegen
        </b-button>
      </b-col>
    </b-row>
    <GroupStudents v-if="selectedGroupName && students.length" v-bind:students="students" />
    <Lesson v-if="selectedGroupName && students.length" v-bind:students="students" v-bind:selectedGroupName="selectedGroupName"/>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import firebase from "firebase/app";
  import 'firebase/auth';
  import Lesson from "../components/Lesson/Lesson";
  import GroupStudents from "../components/GroupStudents/GroupStudents";
  import { getGroupsOf } from "../firebase.js";

  export default Vue.extend({
    name: "ClassRoom",
    components: {
      Lesson,
      GroupStudents
    },
    mounted() {
      this.getTeachersGroups()
    },
    data() {
      return {
        teachersGroups: [],
        selectedGroupName: '',
      }
    },
    computed: {
      students() {
        const teachersGroup = this.teachersGroups.find((group) => {
          return group.groupName === this.selectedGroupName;
        })
        return teachersGroup.students;
      },
    },
    methods: {
      async getTeachersGroups() {
        this.teachersGroups = await getGroupsOf(firebase.auth().currentUser.email);
      },
    },
  })
</script>