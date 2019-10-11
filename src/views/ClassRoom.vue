<template>
  <b-container v-if="teachersGroups.length">
    {{teachersGroups}}
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
        teachersGroups: []
      }
    },
    methods: {
      async getTeachersGroups() {
        this.teachersGroups = await getGroupsOf(firebase.auth().currentUser.email);
      }
    }
  })
</script>