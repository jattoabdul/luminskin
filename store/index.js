// import gql from 'graphql-tag'

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

export const actions = {
  // nuxtServerInit({ commit }, { app }) {
  //   const client = app.apolloProvider.defaultClient
  //   client.query({
  //     products: {
  //       query: gql`
  //         query getProducts($currency: Currency) {
  //           products {
  //             id
  //             title
  //             image_url
  //             price(currency: $currency)
  //           }
  //         }
  //     `,
  //       variables() {
  //         return {
  //           currency: 'USD'
  //         }
  //       }
  //     },
  //     currency: gql`
  //       query getCurrency {
  //         currency
  //       }
  //     `
  //   }).then(data => {
  //     // commit('updateProjects', data.data.result.projects)
  //     console.log(data)
  //   })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }
}
