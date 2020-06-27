/*
 * To configure for IE11
 * npm install -g rollup
 * rollup app.js --file bundle.js --format iife
 * paste bundle.js into the left-hand panel
 * babeljs.io/repl#?browsers=defaults
 * Copy over existing bundle.js with contents
 * of the right-hand panel.
 * Job done.
 */

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

