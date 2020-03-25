<template>
  <div id='jitsi'><div>
</template>

<script>
import Vue from 'vue';
import { joinCall } from "../../jitsi";

export default Vue.extend({
  name: "Jitsi",
  mounted() {
    joinCall(this.groupName)
  },
  data() {
    return {
      groupName: ''
    }
  }
})
</script>