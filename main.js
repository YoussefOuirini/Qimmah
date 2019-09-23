const Vue = require('vue/dist/vue.esm').default;

Vue.component('registration-form', {
  template: `
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
  `,
  data: () => ({
    firstName: '',
    lastName: ''
  }),
  methods: {
    submit: function() {
      console.log(this.firstName, this.lastName);

      this.firstName = '';
      this.lastName = '';
    }
  }
});

new Vue({ el: '#content' });