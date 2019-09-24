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
      <input type="date" v-model="birthDate" />
    </div>

    <div>
      <h2>Adres (straatnaam en huisnummer)</h2>
      <input type="text" v-model="adress" />
    </div>

    <div>
      <h2>Postcode</h2>
      <input type="text" v-model="zipCode" />
    </div>

    <div>
      <h2>Woonplaats</h2>
      <input type="text" v-model="city" />
    </div>

    <div>
      <h2>Email adres</h2>
      <input type="text" v-model="email" />
    </div>

    <div>
      <h2>Telefoonnummer</h2>
      <input type="text" v-model="phoneNumber" />
    </div>

    <div>
      <h2>Ik kan goed arabisch lezen en schrijven</h2>
      <input type="radio" id="arabic" value="yes" v-model="arabic">
      <label for="Yes">Ja</label>
      <br>
      <input type="radio" id="arabic" value="no" v-model="arabic">
      <label for="No">No</label>
      <br>
    </div>

    <div v-if="arabic=== 'yes'">
      <h2>Inschrijving indienen</h2>
      <input type="submit" value="Submit" v-on:click="submit" />
    </div>
    <div v-else-if="arabic ==='no'">
      <h3>Om mee te doen met Dar al-Qoran is het van belang om de arabisch taal machtig te zijn</h3>
      <h3>U kunt zich inschrijven voor de cursussen arabisch </h3>
    </div>

  </div>
</template>
<script>
  module.exports = require("./RegistrationForm.js");
</script>