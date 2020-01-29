<template>
  <b-container fluid>
    <Absentees/>
    <Groups v-if="users.length" v-bind:users="users"/>
    <Users v-if="users.length" v-bind:users="users"/>
  </b-container>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/functions';
import Users from '../components/Users/Users.vue';
import Groups from '../components/Groups/Groups.vue';
import Absentees from '../components/Absentees/Absentees.vue';
import { EventBus } from "../EventBus";

export default Vue.extend({
  name: "School",
  components: {
    Users,
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