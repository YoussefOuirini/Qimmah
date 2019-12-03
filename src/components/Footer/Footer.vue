<template>
  <footer>
    <b-container class="footer">
      &copy; 2019 Copyright | Qimmah {{version}} | <a href="mailto:info@qimmah.nl"> Stuur ons feedback!</a>
    </b-container>
  </footer>
</template>

<script>
  import Vue from "vue";
  import {version} from '../../../package.json';

  export default Vue.extend({
    name: "Footer",
    data() {
      return {
        version: version
      }
    }
  })
</script>

<style scoped>
  .footer {
    left: 0;
    bottom: 0;
    text-align: center;
  }
</style>