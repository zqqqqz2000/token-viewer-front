import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import ECharts from 'vue-echarts'


// register globally (or you can do it locally)
Vue.component('v-chart', ECharts)

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
    render: h => h(App),
}).$mount('#app')
