import Vue from 'vue'
import App from './App.vue'
import { MdButton, MdContent, MdTabs, MdForms } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'



new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdForms)