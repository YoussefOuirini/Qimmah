<template>
  <div>
    <div>
      <h2>Voornaam</h2>
      <input type="text" v-model="firstName" />
    </div>

    <div>
      <h2>Achternaam</h2>
      <input type="text" v-model="lastName" />
    </div>

    <div>
      <h2>Geslacht</h2>
      <input type="radio" id="gender" value="Male" v-model="gender">
      <label for="Male">Man</label>
      <br>
      <input type="radio" id="gender" value="Female" v-model="gender">
      <label for="Female">Female</label>
      <br>
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