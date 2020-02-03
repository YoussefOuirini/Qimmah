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
          accept=".csv"
        ></b-form-file>
        <b-button @click="uploadFile" class="ml-5">Uploaden</b-button>
      </b-col>
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