import Vue from 'https://unpkg.com/vue@next';
// new Vue({
//
// });

const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#counter')