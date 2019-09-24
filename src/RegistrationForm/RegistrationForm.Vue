<template>
  <div>
    <form>
      <div>
        <h2>Voornaam</h2>
        <input type="text" required v-model="firstName" />
      </div>

      <div>
        <h2>Achternaam</h2>
        <input type="text" required v-model="lastName" />
      </div>

      <div>
        <h2>Geslacht</h2>
        <input type="radio" id="gender" name="gender" required value="Male" v-model="gender">
        <label for="Male">Man</label>
        <br>
        <input type="radio" id="gender" name="gender" value="Female" v-model="gender">
        <label for="Female">Female</label>
        <br>
      </div>

      <div>
        <input type="date" required v-model="birthDate" v-on:input="checkAge"/>
      </div>

      <div v-if="underage">
        <div>
          <h2>Voornaam ouder/verzorger</h2>
          <input type="text" required v-model="parent.firstName" />
        </div>
        <div>
          <h2>Achternaam ouder/verzorger</h2>
          <input type="text" required re v-model="parent.lastName" />
        </div>
        <div>
          <h2>Email ouder/verzorger</h2>
          <input type="text" required v-model="parent.email" />
        </div>
      </div>

      <div>
        <h2>Adres (straatnaam en huisnummer)</h2>
        <input type="text" required v-model="adress" />
      </div>

      <div>
        <h2>Postcode</h2>
        <input type="text" required v-model="zipCode" />
      </div>

      <div>
        <h2>Woonplaats</h2>
        <input type="text" required v-model="city" />
      </div>

      <div>
        <h2>Email adres</h2>
        <input type="text" required v-model="email" />
      </div>

      <div>
        <h2>Telefoonnummer</h2>
        <input type="text" required v-model="phoneNumber" />
      </div>

      <div>
        <h2>Ik kan goed arabisch lezen en schrijven</h2>
        <input type="radio" id="arabic" name="arabic" required value="yes" v-model="arabic">
        <label for="Yes">Ja</label>
        <br>
        <input type="radio" id="arabic" name="arabic" value="no" v-model="arabic">
        <label for="No">No</label>
        <br>
      </div>

      <div v-if="arabic==='yes'">
        <h2>Inschrijving indienen</h2>
        <input type="submit" value="Submit" v-on:click="submit" />
      </div>
      <div v-else-if="arabic ==='no'">
        <h4>Om mee te doen met Dar al-Qoran is het van belang om de arabisch taal machtig te zijn</h4>
        <h4>U kunt zich inschrijven voor de cursussen arabisch om eerst arabisch te leren. Daarna kunt u zich inschrijven.</h4>
      </div>
    </form>
  </div>
</template>
<script>
  module.exports = require("./RegistrationForm.js");
</script>