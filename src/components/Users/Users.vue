<template>
  <b-container>
    <h1>Beheer gebruikers</h1>
    <div v-if="users.length" class="search-bar">
      <b-form-input
        @input="searchUsers()"
        v-model="search.text"
        type="text"
        placeholder="Zoek naar gebruikers met email"
      ></b-form-input>
      <span class="search-icon">
        <i class="fas fa-search"></i>
      </span>
    </div>
    <div v-if="rows" class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        v-if="rows > perPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="users"
      ></b-pagination>
      <b-table
        id="users"
        ref="usersTable"
        striped hover selectable
        select-mode="single"
        :items="foundUsers"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        @row-selected="onRowSelected"
      >
        <template v-slot:cell(moderator)="data">
          {{ data.value }}
        </template>
      </b-table>
    </div>
    <div v-if="selectedUser">
      <b-button-group>
        <b-button v-if="!hasCustomClaims || !selectedUser.customClaims.moderator" @click="setUser({'moderator': true})" variant="warning"> Maak {{selectedUser.email}} moderator</b-button>
        <b-button v-if="hasCustomClaims && selectedUser.customClaims.moderator" @click="setUser({'moderator': false})" variant="danger">Verwijder {{selectedUser.email}} als moderator</b-button>
      </b-button-group>
    </div>
  </b-container>
</template>

<script>
  import Vue from 'vue';
  import firebase from 'firebase/app';
  import 'firebase/functions';
  import { EventBus } from "../../EventBus"

export default Vue.extend({
  name: "Users",
  props: ['users'],
  data() {
    return {
      foundUsers: [],
      selectedUser: '',
      search: { text: ""},
      currentPage: 1,
      perPage: 5,
      fields: [{
          key: 'email',
          label: 'Email'
        },{
          key: 'moderator',
          label: 'Beheerder',
          formatter: (value, key, item) => {
            if (item.customClaims && item.customClaims.moderator) {
              return "Ja"
            } else {
              return "Nee"
            }
          }
        }],
    }
  },
  computed: {
    rows() {
      return this.foundUsers.length
    },
    hasCustomClaims() {
      return this.selectedUser.customClaims;
    }
  },
  methods: {
    searchUsers() {
      this.selectedUser = '';
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
    },
    async setUser(newRole) {
      const mergedRole = this.merge(this.selectedUser.customClaims, newRole);
      const addModerator = firebase.functions().httpsCallable('addModerator');
      await addModerator({email: this.selectedUser.email, role: mergedRole });
      EventBus.reloadUsers();
    },
    merge(role, newRole) {
      if (role) {
        return Object.assign(role, newRole);
      } else {
        return newRole;
      }
    }
  }
})
</script>