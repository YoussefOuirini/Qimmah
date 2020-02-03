<template>
  <b-row>
    <b-form-row>
      <b-col>
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Selecteer een CSV document of sleep het hier naar toe..."
          drop-placeholder="Drop file here..."
          class="m-5 px-5"
        ></b-form-file>
      </b-col>
    </b-form-row>
    <b-form-row class="mt-3">
      <b-col class="m-5 px-5">Geselecteerde document: {{ file ? file.name : '' }}</b-col>
    </b-form-row>
  </b-row>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      file: null
    }
  }
})
</script>