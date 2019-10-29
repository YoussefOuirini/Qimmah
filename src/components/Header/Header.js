import Vue from "vue";
import firebase from "firebase/app";
import 'firebase/auth';
import { checkUserClaim } from "@/firebase/firebase";
import { EventBus } from "../../EventBus"

export default Vue.extend({
  name: "Header",
  mounted() {
    this.loggedInUser = firebase.auth().currentUser;
    this.checkUserClaims();
    EventBus.$on('userLoginChange', () => {
      this.checkUserClaims();
      this.loggedInUser = firebase.auth().currentUser;
    })
  },
  data() {
    return {
      userIsModerator: false,
      userIsTeacher: false,
      loggedInUser: false
    }
  },
  methods: {
    async checkUserClaims() {
      this.userIsModerator = await checkUserClaim('moderator');
      this.userIsTeacher = await checkUserClaim('teacher');
    }
  }
})
