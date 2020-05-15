
export const state = () => ({
  products: [],
  currency: [],
  cart: [],
  tax: 0.065,
  cartSubTotal: 0,
  cartTotal: 0,
  currentCurrency: 'USD',
  showCart: false
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  clearProducts(state) {
    state.products = []
  },
  setCurrency(state, currency) {
    state.currency = currency
  },
  clearCurrency(state) {
    state.currency = []
  },
  addToCart(state, product) {
    // state.cart = product
  },
  removeProduct(state, product) {
    state.cart = []
  },
  clearCart(state) {
    state.cart = []
    state.cartSubTotal = 0
    state.cartTotal = 0
    state.showCart = false
  },
  quantityChange(state, product, direction) {

  },
  selectCurrency(state, index) {

  }
}

export const getters = {}

export const actions = {}
