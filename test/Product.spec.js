import { shallowMount } from '@vue/test-utils'
import Product from '@/components/Product.vue'
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

const product = {
  id: 1,
  title: 'product title',
  price: 100,
  image_url: 'image.svg'
}

const factory = () => {
  return shallowMount(Product, {
    propsData: {
      currentCurrency: 'USD',
      product
    }
  })
}

describe('Product', () => {
  test('mounts properly', () => {
    const wrapper = factory()
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correctly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
