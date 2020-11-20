import { store } from './store/store.js';
import { router } from './router/router.js';

Vue.config.devtools = true

Vue.use(VueRouter)

new Vue({
  el: '#app',
  store,
  router,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  }
})
