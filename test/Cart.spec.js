import { mount, shallowMount } from '@vue/test-utils'
import Cart from '@/components/Cart.vue'

// @TODO: Fix Tests
const factory = () => {
  return shallowMount(Cart, {
  })
}

describe('Cart', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders correctly', () => {
    const wrapper = mount(Cart)
    expect(wrapper.element).toMatchSnapshot()
  })
})
