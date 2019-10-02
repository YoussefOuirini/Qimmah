<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
  import Vue from "vue";
  import Header from "./components/Header/Header.vue";
  import Footer from "./components/Footer/Footer.vue";

  export default Vue.extend({
    name: "App",
    components: {
      Header,
      Footer
    }
  })
</script>