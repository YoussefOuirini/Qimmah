<template>
  <b-container>
    <div class="search-bar">
      <b-form-input
        @input="searchUsers()"
        v-model="search.text"
        type="text"
        placeholder="Zoek met email"
      ></b-form-input>
      <span class="search-icon">
        <i class="fas fa-search"></i>
      </span>
    </div>
    <div v-if="rows" class="overflow-auto">
        <b-pagination
        v-if="rows > perPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="users"
      ></b-pagination>
      <b-table
        id="users" 
        striped hover selectable
        select-mode="single"
        :items="foundUsers" 
        :fields="fields"
        @row-selected="onRowSelected"
      ></b-table>
    </div>
    <div v-if="selectedUser">
      <b-button-group>
        <b-button variant="warning"> Maak gebruiker leraar </b-button>
        <b-button variant="danger"> Maak gebruiker admin</b-button>
      </b-button-group>
    </div>
  </b-container>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase';

export default Vue.extend({
  name: "Teacher",
  mounted() {
    this.getUsers()
  },
  data() {
    return {
      users: [],
      foundUsers: [],
      selectedUser: [],
      search: { text: ""},
      perPage: 10,
      fields: [{
          key: 'email',
          label: 'Email'
        },{
          key: 'customClaims',
          label: 'Autorisatie'
        }],
    }
  },
  computed: {
    rows() {
      return this.foundUsers.length
    }
  },
  methods: {
    async getUsers() {
      const getAllUsers = firebase.functions().httpsCallable('getAllUsers');
      const allUsers = await getAllUsers();
      this.users = allUsers.data;
    },
    searchUsers() {
      this.foundUsers = this.users.filter((user) => {
        if(!this.search.text) {
          return;
        }
        if(user.email.toLowerCase().search(this.search.text.toLowerCase()) != -1) {
          return user;
        }
      })
    },
    onRowSelected(user) {
      this.selectedUser = user[0]
    }
  }
})
</script>