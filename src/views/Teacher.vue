<template>
  <div class="overflow-auto">
      <b-pagination
      v-if="rows > perPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="users"
    ></b-pagination>
    <b-table 
      id="users" 
      striped hover 
      :items="users" 
      :fields="fields"
    ></b-table>
  </div>
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
      perPage: 10,
      fields: [{
          key: 'email',
          label: 'Email'
        },{
          key: 'customClaims',
          label: 'Autoriteit'
        }],
    }
  },
  computed: {
    rows() {
      return this.users.length
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