<template>
  <b-container>
    <Absentees />
    <Groups v-if="users.length" v-bind:users="users"/>
    <Teachers v-if="users.length" v-bind:users="users"/>
  </b-container>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/functions';
import Teachers from '../components/Teachers/Teachers.vue';
import Groups from '../components/Groups/Groups.vue';
import Absentees from '../components/Absentees/Absentees.vue';
import { EventBus } from "../EventBus";

export default Vue.extend({
  name: "School",
  components: {
    Teachers,
    Groups,
    Absentees
  },
  mounted() {
    this.getUsers();
    EventBus.$on('moderatorUpdated', () => {
      this.getUsers();
    })
  },
  data() {
    return {
      users: [],
    }
  },
  methods: {
    async getUsers() {
      const getAllUsers = firebase.functions().httpsCallable('getAllUsers');
      const allUsers = await getAllUsers();
      this.users = allUsers.data;
    },
  }
})
</script>