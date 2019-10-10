<template>
  <b-container>
    <Groups v-if="users.length" v-bind:users="users"/>
    <Teachers v-if="users.length" v-bind:users="users"/>
  </b-container>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase';
import Teachers from '../components/Teachers/Teachers.vue'
import Groups from '../components/Groups/Groups.vue'

export default Vue.extend({
  name: "School",
  components: {
    Teachers,
    Groups
  },
  mounted() {
    this.getUsers()
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