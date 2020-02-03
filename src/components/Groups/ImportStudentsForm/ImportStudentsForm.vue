<template>
  <b-row>
    <b-form-row>
      <b-col>
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Selecteer een CSV document of sleep het hier naar toe..."
          drop-placeholder="Drop file here..."
          class="mx-5 px-5"
          accept=".csv"
        ></b-form-file>
        <h6 class="ml-5">{{uploadResponse}}</h6>
        <b-button @click="uploadFile" class="ml-5">Uploaden</b-button>
      </b-col>
    </b-form-row>
  </b-row>
</template>

<script>
import Vue from 'vue';
import { uploadStudents } from './uploadStudents';

export default Vue.extend({
  data() {
    return {
      file: null,
      uploadResponse: null
    }
  },
  methods: {
    async uploadFile() {
      await uploadStudents(this.file);
      this.file = null;
      this.uploadResponse = "Studenten geüpload!";
      this.reloadRegistrations();
    },
    reloadRegistrations() {
      this.$emit('reloadRegistrations', true);
    },
  }
})
</script>