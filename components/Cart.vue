<template>
  <div>
    <h3>Shopping Cart</h3>
    <div class="cart">
      <div class="panel panel-default">
        <div class="panel-header">
          <!-- currency selector -->
          <p @click.stop="toggleCurrencySelector()">
            Select Currency
          </p>
          <ul v-show="showCurrencySelector" class="currency-selector">
            <li v-for="(eachCurrency, index) in currency" :key="index" @click.stop="selectCurrency(index)">
              {{ eachCurrency }} - currency
            </li>
          </ul>
          <!-- end of currency selector -->
        </div>
        <div class="panel-body">
          <div v-if="computedCart.length > 0" class="cart__body">
            <ul>
              <CartItem
                v-for="item in computedCart"
                :key="item.id"
                :item="item"
                :current-currency="currentCurrency"
              />
            </ul>
          </div>
          <div v-if="computedCart.length <= 0" class="alert alert-info">
            Cart is empty
          </div>
          <div class="cart__total">
            Subtotal: {{ cartSubTotal | currency({symbol: getCurrencySymbol(currentCurrency.toLowerCase())}) }}
          </div>
          <button @click.stop="clearCart()">
            Clear Cart
          </button>
          <button @click.stop="proceedToCheckout()" :disabled="computedCart.length <= 0">
            Proceed To checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue'

export default {
  name: 'Cart',
  components: {
    CartItem
  },
  props: {
    showCurrencySelector: {
      type: Boolean,
      default() {
        return false
      }
    },
    currency: {
      type: Array,
      default() {
        return []
      }
    },
    cart: {
      type: Array,
      default() {
        return []
      }
    },
    currentCurrency: {
      type: String,
      default() {
        return []
      }
    },
    tax: {
      type: Number,
      default() {
        return 0.065
      }
    },
    products: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    cartSubTotal() { return this.computedCart.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0) },
    cartTotal() { return this.cartSubTotal + (this.tax * this.cartSubTotal) },
    computedCart() {
      return this.cart.map((cartproduct) => {
        const foundProduct = this.products.find((itemForSale) => {
          return cartproduct.id === itemForSale.id
        })
        foundProduct.quantity = cartproduct.quantity
        return foundProduct
      })
    }
  },
  methods: {
    selectCurrency(index) {
      this.$eventBus.$emit('select-currency', { index })
    },
    clearCart() {
      this.$eventBus.$emit('clear-cart')
    },
    proceedToCheckout() {
      this.$eventBus.$emit('proceed-to-checkout')
    },
    toggleCurrencySelector() {
      this.$eventBus.$emit('toggle-currency-selector')
    }
  }
}
</script>

<style scoped lang="scss">
.cart__body {
  margin-bottom: 0.7em;
}
.cart__total {
  font-weight: bold;
  font-size: 1.5em;
  line-height: 1.1em;
  text-align: right;
}
</style>
