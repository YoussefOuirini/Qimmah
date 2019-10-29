<template>
  <b-container>
    <b-form>
      <b-form-input
        v-model="school"
        required
        placeholder="Vul de naam van jouw school in."
      ></b-form-input>
      <b-button @click="create">Maak school</b-button>
    </b-form>
  </b-container>
</template>

<script>
import Vue from 'vue';
import { createSchool } from "@/firebase/firebase";

export default Vue.extend({
  name: 'SchoolForm',
  data() {
    return {
      school: ""
    }
  },
  methods: {
    create() {
      createSchool(this.school);
    }
  }
})
</script>