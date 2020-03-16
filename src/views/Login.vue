<template>
  <b-container id="firebaseui-auth-container"></b-container>
</template>

<script>
import { ui, uiConfig } from '../firebase/firebaseui';

export default {
  name: 'Login',
  mounted() {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
</script>