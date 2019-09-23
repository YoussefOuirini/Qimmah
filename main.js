const Vue = require('vue/dist/vue.esm').default;

Vue.component('registration-form', {
  template: `
    <h1>Hello, World</h1>
  `,
});

new Vue({ el: '#content' });