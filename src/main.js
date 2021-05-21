import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueTypedJs from 'vue-typed-js'
import VueProgressBar from 'vue-progressbar'
import VueSplash from 'vue-splash'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Vuex from 'vuex'

import App from './App.vue'
import router from './router'

import './assets/style/theme/index.css'
import './assets/custom.scss'

Vue.config.productionTip = false

const progressBarOptions = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueTypedJs)
Vue.use(Vuex)
Vue.use(VueProgressBar, progressBarOptions)
Vue.use(VueRouter)
Vue.use(VueSplash)
Vue.use(ElementUI)

const store = new Vuex.Store({
  state: {
    active_process: 0,
    done_creating: false,
    storage_network: 'crust'
  },
  mutations: {
    next_step (state) {
      state.active_process++
      if (state.active_process === 3) {
        state.done_creating = true
      } else if (state.active_process > 3) {
        state.active_process = 3
      }
    },
    last_step (state) {
      state.active_process--
      if (state.active_process < 0) {
        state.active_process = 0
      }
    },
    set_storage_network (state, network) {
      state.storage_network = network
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
