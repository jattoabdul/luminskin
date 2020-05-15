<template>
  <div class="container dark-color">
    <!-- nav -->
    <nav class="nav-bar">
      <span>
        Lumin
      </span>
      <ul>
        <li>
          Shop
        </li>
        <li>
          Learn
        </li>
      </ul>
      <span>
        Account
      </span>
      <!-- cart icon & count -->
      <span @click.stop="showCart = !showCart" class="cart-count">
        cartsize: {{ cart | cartSize }}
      </span>
      <!--end of cart icon & count -->
    </nav>
    <!-- end of nav -->

    <!-- header -->
    <div class="header">
      <div>
        <h1>
          All Products
        </h1>
      </div>
      <div>
        <span>
          Filter
        </span>
      </div>
    </div>
    <!-- end of header -->

    <!-- product list -->
    <product-list :products="products" :current-currency="currentCurrency" />
    <!-- end of product list -->

    <!-- cart content -->
    <div v-show="showCart" class="cart">
      <cart
        :products="products"
        :show-currency-selector="showCurrencySelector"
        :currency="currency"
        :cart="cart"
        :current-currency="currentCurrency"
        :tax="tax"
      />
    </div>
    <!-- end cart content -->
  </div>
</template>

<script>
// @TODO: use vuex to keep track of application state
import gql from 'graphql-tag'
import ProductList from '~/components/ProductList'
import Cart from '~/components/Cart'

export default {
  components: {
    ProductList,
    Cart
  },
  filters: {
    cartSize (cart) {
      let cartSize = 0

      for (let i = 0; i < cart.length; i++) {
        cartSize += cart[i].quantity
      }

      return cartSize
    }
  },
  data () {
    return {
      currentCurrency: 'USD',
      cart: [],
      tax: 0.065,
      cartSubTotal: 0,
      showCart: false,
      showCurrencySelector: false
    }
  },
  computed: {},
  apollo: {
    products: {
      query: gql`
        query getProducts($currency: Currency) {
          products {
            id
            title
            image_url
            price(currency: $currency)
          }
        }
    `,
      variables () {
        return {
          currency: this.currentCurrency
        }
      }
    },
    currency: gql`
      query getCurrency {
        currency
      }
    `
  },
  mounted() {
    this.$eventBus.$on('add-to-cart', payload => {
      this.addToCart(payload.product)
    })
    this.$eventBus.$on('select-currency', payload => {
      this.selectCurrency(payload.index)
    })
    this.$eventBus.$on('remove-product', payload => {
      this.removeProduct(payload.product)
    })
    this.$eventBus.$on('quantity-change', payload => {
      this.quantityChange(payload.product, payload.action)
    })
    this.$eventBus.$on('clear-cart', _ => {
      this.clearCart()
    })
    this.$eventBus.$on('proceed-to-checkout', _ => {
      this.proceedToCheckout()
    })
    this.$eventBus.$on('toggle-currency-selector', _ => {
      this.toggleCurrencySelector()
    })
  },
  methods: {
    addToCart (product) {
      let found = false

      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === product.id) {
          const newProduct = this.cart[i]
          newProduct.quantity = newProduct.quantity + 1
          this.$set(this.cart, i, newProduct)
          found = true
          break
        }
      }

      if (!found) {
        product.quantity = 1
        this.cart.push(product)
      }
      // open sidebar
      this.showCart = true
    },
    removeProduct (product) {
      const index = this.cart.indexOf(product)
      this.cart.splice(index, 1)
    },
    clearCart () {
      this.cart = []
      this.cartSubTotal = 0
      this.cartTotal = 0
      this.showCart = false
      this.showCurrencySelector = false
    },
    quantityChange (product, direction) {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === product.id) {
          const newProduct = this.cart[i]
          if (direction === 'incriment') {
            newProduct.quantity = newProduct.quantity + 1
            this.$set(this.cart, i, newProduct)
          } else {
            newProduct.quantity = newProduct.quantity - 1
            if (newProduct.quantity === 0) {
              const index = this.cart.indexOf(newProduct)
              this.cart.splice(index, 1)
            } else {
              this.$set(this.cart, i, newProduct)
            }
          }
        }
      }
    },
    selectCurrency(index) {
      const currentCurrency = this.currency[index]

      if (currentCurrency && currentCurrency !== 'AED') {
        this.currentCurrency = currentCurrency
      } else {
        this.currentCurrency = 'USD'
      }
      this.showCurrencySelector = false
    },
    proceedToCheckout() {
      console.log('checking out this cart =>', this.cart)
      //  toast cart checked out
      this.clearCart()
    },
    toggleCurrencySelector() {
      this.showCurrencySelector = !this.showCurrencySelector
    }
  }
}
</script>

<style scoped lang="scss">
/* .container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
} */
.ash-color {
  color: #e2e6e3;
}
.light-color {
  color: #fcfcfa;
}
.dark-color {
  color: #4b5547;
}
</style>
