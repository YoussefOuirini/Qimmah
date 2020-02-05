import Vue from "vue";
import { getCurrentUser, getUserEmail, checkUserClaim, signOut, userIs } from "@/firebase/firebase";
import { EventBus } from "../../EventBus";

export default Vue.extend({
  name: "Header",
  mounted() {
    this.loadUserData();
    EventBus.$on('userLoginChange', () => {
      this.loadUserData();
    });
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
      const teacher = getCurrentUser();
      this.userIsTeacher = await userIs(teacher);
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
    },
    loadUserData() {
      this.checkUserClaims();
      this.loggedInUser = getCurrentUser();
      this.loadUserEmail();
    }
  }
});
