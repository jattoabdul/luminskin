import { shallowMount } from '@vue/test-utils'
import Cart from '@/components/Cart.vue'
import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'
import getSymbolFromCurrency from 'currency-symbol-map'

Vue.use(VueCurrencyFilter, {
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: false
})

Vue.mixin({
  methods: {
    getCurrencySymbol(currency) {
      const foundCurrency = getSymbolFromCurrency(currency)
      if (foundCurrency) {
        return foundCurrency
      }
      return currency
    }
  }
})

// @TODO: Fix Tests
const products = [
  {
    id: 1,
    title: 'product title',
    price: 100,
    image_url: 'image.svg'
  }
]
const currency = ['USD', 'NGN']

const factory = () => {
  return shallowMount(Cart, {
    propsData: {
      showCurrencySelector: false,
      currency,
      cart: [],
      currentCurrency: 'USD',
      tax: 0.065,
      showCart: false,
      products
      // cartSubTotal: 0,
      // cartTotal: [],
      // computedCart: []
    }
  })
}

describe('Cart', () => {
  test('mounts properly', () => {
    const wrapper = factory()
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly', () => {
    // const wrapper = mount(Cart)
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
