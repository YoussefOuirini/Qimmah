<template>
  <div id='jitsi'></div>
</template>

<script>
import Vue from 'vue';
import { joinCall } from "../jitsi";

export default Vue.extend({
  name: "Jitsi",
  mounted() {
    joinCall(this.$route.params.group)
  },
  data() {
    return {
      groupName: ''
    }
  }
})
</script>