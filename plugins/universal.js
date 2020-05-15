import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.prototype.$eventBus = new Vue()
Vue.use(VueCurrencyFilter, {
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: false
})
