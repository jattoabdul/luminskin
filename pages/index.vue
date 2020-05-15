<template>
  <div class="container dark-color">
    <!-- header -->
    <h1>
      Luminskin All Products
    </h1>
    <!-- end of header -->

    <br>
    <br>

    <!-- product list -->
    <ul>
      <!-- single product -->
      <li v-for="product in products" :key="product.id">
        <img :src="product.image_url" :alt="product.title">
        <p>
          {{ product.title }} - {{ product.price | currency({symbol: getCurrencySymbol(currentCurrency.toLowerCase())}) }}
        </p>
        <button @click.stop="addToCart(product)">
          Add to Cart
        </button>
      </li>
      <!-- end of single product -->
    </ul>
    <!-- end of product list -->

    <br>
    <br>

    <!-- cart icon -->
    <p @click.stop="showCart = !showCart" class="cart-count">
      cartsize: {{ cart | cartSize }}
    </p>
    <!--end of cart icon -->

    <br>

    <!-- cart content -->
    <div v-show="showCart" class="cart">
      <!-- currency selector -->
      <p @click.stop="showCurrencySelector = !showCurrencySelector">
        Select Currency
      </p>
      <ul v-show="showCurrencySelector" class="currency-selector">
        <li v-for="(eachCurrency, index) in currency" :key="index" @click.stop="selectCurrency(index)">
          {{ eachCurrency }} - currency
        </li>
      </ul>
      <!-- end of currency selector -->
      <br>
      <br>
      <ul>
        <!-- single cart item -->
        <li v-for="cartItem in cart" :key="cartItem.id">
          {{ cartItem.title }}
          <button @click.stop="removeProduct(cartItem)">
            x
          </button>
          <button @click.stop="quantityChange(cartItem, 'incriment')">
            +
          </button>
          {{ cartItem.quantity }}
          <button @click.stop="quantityChange(cartItem, 'decriment')">
            -
          </button>
          {{ cartItem.price | currency({symbol: getCurrencySymbol(currentCurrency.toLowerCase())}) }}
          <img :src="cartItem.image_url" :alt="cartItem.title">
        </li>
        <!-- end of single cart item -->
      </ul>
      <p>
        cartSubtotal: {{ cartSubTotal | currency({symbol: getCurrencySymbol(currentCurrency.toLowerCase())}) }}
      </p>
      <button @click.stop="clearCart()">
        Clear Cart
      </button>
      <br>
      <button @click.stop="proceedToCheckout()" :disabled="cart.length <= 0">
        Proceed To checkout
      </button>
    </div>
    <!-- end cart content -->
  </div>
</template>

<script>
import gql from 'graphql-tag'
// import ProductList from '~/components/ProductList'
// import Cart from '~/components/Cart'

export default {
  components: {
    // ProductList,
    // Cart
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
      cartTotal: 0,
      checkoutBool: false,
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

      this.cartSubTotal = this.cartSubTotal + product.price
      this.cartTotal = this.cartSubTotal + (this.tax * this.cartSubTotal)
      this.checkoutBool = true
    },
    removeProduct (product) {
      const index = this.cart.indexOf(product)
      this.cart.splice(index, 1)
      this.cartSubTotal = this.cartSubTotal - (product.price * product.quantity)
      this.cartTotal = this.cartSubTotal + (this.tax * this.cartSubTotal)

      if (this.cart.length <= 0) {
        this.checkoutBool = false
      }
    },
    clearCart () {
      this.cart = []
      this.cartSubTotal = 0
      this.cartTotal = 0
      this.checkoutBool = false
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
              this.cart.splice(i, 1)
            } else {
              this.$set(this.cart, i, newProduct)
            }
          }
        }
      }

      if (direction === 'incriment') {
        this.cartSubTotal = this.cartSubTotal + product.price
      } else {
        this.cartSubTotal = this.cartSubTotal - product.price
      }

      this.cartTotal = this.cartSubTotal + (this.tax * this.cartSubTotal)

      if (this.cart.length <= 0) {
        this.checkoutBool = false
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
    }
  }
}
</script>

<style>
.container {
  /* @apply min-h-screen flex justify-center items-center text-center mx-auto; */
  display: flex;
  flex-direction: row;
}
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
