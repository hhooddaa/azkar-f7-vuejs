// Import Vue
import Vue from 'vue'

// Import Framework7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import Framework7 Vue
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Style
import Framework7CSS from 'framework7/dist/css/framework7.rtl.css'

// Import F7 iOS Icons
import Framework7Icons from 'framework7-icons/css/framework7-icons.css'

// Import Fontawesome Theme Styles
import FontAwesome from 'font-awesome/css/font-awesome.css'

// Import App Custom Styles
//import AppStyles from './assets/sass/main.scss'

// Import App Component
import app from './main.vue'

// Import Routes
import routes from './routes.js'

// Import Vuex Storage
import store from './assets/vuex/storage.js'

store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem(state.version, JSON.stringify(state));
});

// Install Plugin
Vue.use(Framework7Vue, Framework7);

import VueTouch from 'vue-touch'
Vue.use(VueTouch)
VueTouch.config.swipe = {
  direction: 'horizontal'
}

let theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  render: c => c('app'),
  components: {
    app,
  },
  framework7: {
    id: 'io.framework7.testapp',
    theme, // md or ios
  },
  routes,
});
