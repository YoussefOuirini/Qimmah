import Vue from "vue";
import { checkUserClaim } from "../../firebase.js";
import { EventBus } from "../../EventBus"

export default Vue.extend({
  name: "Header",
  mounted() {
    this.checkUserClaims();
    EventBus.$on('userLoginChange', () => {
      this.checkUserClaims();
    })
  },
  data() {
    return {
      userIsModerator: false,
      userIsTeacher: false
    }
  },
  methods: {
    async checkUserClaims() {
      this.userIsModerator = await checkUserClaim('moderator');
      this.userIsTeacher = await checkUserClaim('teacher');
    }
  }
})
