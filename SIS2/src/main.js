import Vue from 'vue'
import App from './App.vue'
import BaseCard from './components/BaseCard.vue'

Vue.component('BaseCard', BaseCard) // GLOBAL component

new Vue({
  render: h => h(App)
}).$mount('#app')