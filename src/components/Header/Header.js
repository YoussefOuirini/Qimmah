import Vue from "vue";
import { getCurrentUser, getUserEmail, checkUserClaim, signOut } from "@/firebase/auth";
import { EventBus } from "../../EventBus";

export default Vue.extend({
  name: "Header",
  mounted() {
    this.loggedInUser = getCurrentUser();
    this.checkUserClaims();
    EventBus.$on('userLoginChange', () => {
      this.checkUserClaims();
      this.loggedInUser = getCurrentUser();
    });
    this.loadUserEmail();
  },
  data() {
    return {
      userEmail: "Gebruiker",
      userIsModerator: false,
      userIsTeacher: false,
      loggedInUser: false
    };
  },
  methods: {
    async checkUserClaims() {
      this.userIsModerator = await checkUserClaim('moderator');
      this.userIsTeacher = await checkUserClaim('teacher');
    },
    logout() {
      signOut().then(() => {
        EventBus.reloadLoggedinUser();
        this.loggedInUser = getCurrentUser();
        this.$router.replace('login');
      });
    },
    loadUserEmail() {
      if (getCurrentUser()) {
        this.userEmail = getUserEmail();
      }
    }
  }
});
