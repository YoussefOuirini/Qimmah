import Vue from "vue";
import { checkIfUserIsModerator } from "../../firebase.js";

export default Vue.extend({
  name: "Header",
  async mounted() {
    const userIsMod = await checkIfUserIsModerator();
    this.userIsModerator = userIsMod;
  },
  data() {
    return {
      userIsModerator: false
    }
  }
})
