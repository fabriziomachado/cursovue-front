import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'

import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format'
import VueFilterNumericFormat from '@vuejs-community/vue-filter-numeric-format'
import VueNoty from 'vuejs-noty'

import store from './store/index' // vuex

//import VueUploadComponent from 'vue-upload-component'
//Vue.component('file-upload', VueUploadComponent)

Vue.filter('formatSize',  (size) => {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  return size.toString() + ' B'
})

Vue.use(VueFilterDateFormat, {
  dayOfWeekNames: [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta',
    'Sexta', 'Sábado'
  ],
  dayOfWeekNamesShort: [
    'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'
  ],
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  // Timezone offset, in minutes (0 - UTC, 180 - Russia, undefined - current)
  timezone: -3
});
Vue.use(VueFilterNumericFormat, {
  decimalSeparator: ',',
  fractionDigitsMax: 2,
  fractionDigitsMin: 2,
  fractionDigitsSeparator: ',',
  thousandsDigitsSeparator: '.'
});
Vue.use(VueNoty)
Vue.use(BootstrapVue)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
