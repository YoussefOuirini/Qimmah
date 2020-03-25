<template>
  <div id='jitsi'></div>
</template>

<script>
import Vue from 'vue';
import { joinCall } from "../jitsi";

export default Vue.extend({
  name: "Jitsi",
  mounted() {
    this.call = joinCall(this.$route.params.group);
  },
  beforeDestroy() {
    this.call.hangup();
  },
  data() {
    return {
      call: {}
    }
  }
})
</script>