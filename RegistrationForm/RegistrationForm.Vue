<template>
  <div>
    <div>
      <h2>First Name</h2>
      <input type="text" v-model="firstName" />
    </div>

    <div>
      <h2>Last Name</h2>
      <input type="text" v-model="lastName" />
    </div>
    <div>
      <h2>Submit</h2>
      <input type="submit" value="Submit" v-on:click="submit" />
    </div>
  </div>
</template>
<script>
  module.exports = require("./RegistrationForm.js");
</script>