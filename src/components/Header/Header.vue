<template>
  <div id="page" class="site">
    <header id="masthead" class="site-header" role="banner">
      <div class="custom-header">
        <div class="custom-header-media">
          <div id="wp-custom-header" class="wp-custom-header"><img src="../../assets/qimmah-background.jpg" width="2000" height="1198" alt="Qimmah" sizes="100vw" /></div>
        </div>
        <div class="site-branding">
            <div class="wrap">
              <div class="site-branding-text">
                <p class="site-title"><a href="/" rel="home">Qimmah</a></p>
              </div><!-- .site-branding-text -->
            </div><!-- .wrap -->
        </div><!-- .site-branding -->
      </div><!-- .custom-header -->
      <div class="navigation-top">
        <div class="wrap">
          <b-navbar toggleable="lg">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item><router-link to="/home">Home</router-link></b-nav-item>
                <b-nav-item v-if="loggedInUser"><router-link to="/aanwezigheid">Aanwezigheid</router-link></b-nav-item>
                <b-nav-item v-if="userIsModerator"><router-link to="/school">School</router-link></b-nav-item>
                <b-nav-item v-if="userIsTeacher"><router-link to="/klas">Klas</router-link></b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div><!-- .wrap -->
      </div><!-- .navigation-top -->
    </header><!-- #masthead -->
  </div><!-- #page -->
</template>

<script>
  module.exports = require("./Header.js");
</script>