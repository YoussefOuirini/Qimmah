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
        <h6 style="color:green" class="ml-5">{{uploadResponse}}</h6>
        <b-button @click="uploadFile" class="ml-5" :disabled="loading">
          <b-spinner v-if="loading" small type="grow"></b-spinner>
          Uploaden
        </b-button>
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
      uploadResponse: null,
      loading: false
    }
  },
  methods: {
    async uploadFile() {
      this.loading = true;
      await uploadStudents(this.file);
      this.file = null;
      this.reloadRegistrations();
      this.uploadResponse = "Studenten geüpload!";
      this.loading = false;
    },
    reloadRegistrations() {
      this.$emit('reloadRegistrations', true);
    },
  }
})
</script>