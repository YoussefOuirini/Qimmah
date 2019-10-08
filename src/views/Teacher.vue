<template>
  <b-container>
    <b-table striped hover :items="users" :fields="fields"></b-table>
  </b-container>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase';

export default Vue.extend({
  name: "Teacher",
  mounted() {
    this.searchUsers()
  },
  data() {
    return {
      users: [],
      fields: [{
          key: 'email',
          label: 'Email'
        },{
          key: 'customClaims',
          label: 'Autoriteit'
        }],
    }
  },
  methods: {
    async searchUsers() {
      const getAllUsers = firebase.functions().httpsCallable('getAllUsers');
      const allUsers = await getAllUsers();
      this.users = allUsers.data;
    }
  }
})
</script>