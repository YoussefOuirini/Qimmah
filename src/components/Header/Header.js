import Vue from "vue";
import { checkIfUserIsModerator } from "../../firebase.js";
import { EventBus } from "../../EventBus"

export default Vue.extend({
  name: "Header",
  async mounted() {
    this.userIsModerator = await checkIfUserIsModerator();
    EventBus.$on('userLoginChange', async () => {
      this.userIsModerator = await checkIfUserIsModerator();
    })
  },
  data() {
    return {
      userIsModerator: false
    }
  },
})
