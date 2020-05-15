import Vue from 'vue'

import Ripple from 'vue-ripple-directive'
import VueScrollTo from 'vue-scrollto'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.directive('ripple', Ripple)
Vue.use(VueScrollTo)
Vue.use(VueCurrencyFilter, {
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: false
})
