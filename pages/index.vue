<template>
  <div class="dark-color">
    <!-- nav -->
    <nav class="nav-bar">
      <div class="links">
        <nuxt-link to="/">
          Lumin
        </nuxt-link>
        <nuxt-link to="/">
          Shop
        </nuxt-link>
        <nuxt-link to="/">
          Learn
        </nuxt-link>
      </div>
      <div class="user-actions">
        <nuxt-link to="/">
          Account
        </nuxt-link>
        <div @click.stop="showCart = !showCart" class="cart">
          <span class="cart-count">{{ cart | cartSize }}</span>
          <img src="/arrows.svg" alt="cart-icon">
        </div>
      </div>
    </nav>
    <!-- end of nav -->

    <!-- header -->
    <div class="header">
      <div>
        <h1>
          All Products
        </h1>
        <p>A 360<sup>°</sup> look at Lumin</p>
      </div>
      <div class="filter">
        <select name="filter">
          <option value="null">
            Filter by
          </option>
        </select>
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
        :show-cart="showCart"
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
    this.$eventBus.$on('close-cart', _ => {
      this.showCart = false
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
      //  @TODO: toast cart checked out
      this.clearCart()
    },
    toggleCurrencySelector() {
      this.showCurrencySelector = !this.showCurrencySelector
    }
  }
}
</script>

<style scoped lang="scss">
.dark-color {
  color: #4b5547;
}

.nav-bar {
  @apply px-16 flex  items-center justify-between h-16;
  border-top: #4b5547 solid 1px;
  border-bottom: #4b55472a solid 1px;

  .links {
    a {
      @apply px-3 mr-2;
    }
  }

  .user-actions {
    @apply flex items-center justify-between;

    .cart {
      @apply flex items-center justify-center relative px-3 py-1 ml-3;

      .cart-count {
        @apply absolute top-0 right-0;
      }
      img {
        height: 1.5rem;
      }
    }
  }
}

.header {
  @apply flex items-end justify-between py-20 px-24;

  h1 {
    @apply text-3xl font-medium;
  }

  p {
    @apply my-3;
  }

  .filter {
    @apply border px-8 py-3;
  }
}
</style>
