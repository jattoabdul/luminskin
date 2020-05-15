<template>
  <div @click.self="closeCart()" class="cart__widget">
    <div class="cart__content">
      <header>
        <span @click.stop="closeCart()" class="go-back">
          <img src="/back.svg" alt="go-back-to-products">
        </span>
        <h3 class="cart__heading">
          Your Cart
        </h3>
        <div class="currency-selection">
          <select @change="onChange($event)" name="currency">
            <option v-for="(eachCurrency, index) in currency" :key="index" :value="index">
              {{ eachCurrency }}
            </option>
          </select>
        </div>
      </header>
      <div class="cart__items-wrapper">
        <div v-if="computedCart.length > 0" class="cart__body">
          <ul>
            <li
              v-for="item in computedCart"
              :key="item.id"
              class="cart-item"
            >
              <div class="item__head">
                <button @click.stop="removeProduct(item)" class="btn btn-danger btn-xs">
                  X
                </button>
                <span class="cart-item__name">
                  {{ item.title }}
                </span>
              </div>
              <div class="cart-item__image">
                <img :src="item.image_url" :alt="item.title">
              </div>
              <div class="cart-item__desc-wrap">
                <div class="cart-item__quantity-wrap">
                  <button @click.stop="quantityChange(item, 'incriment')" class="btn cart-item__quantity-increment">
                    +
                  </button>
                  <span class="cart-item__quantity">
                    {{ item.quantity }}
                  </span>
                  <button @click.stop="quantityChange(item, 'decriment')" class="btn cart-item__quantity-decrement">
                    -
                  </button>
                </div>
                <div class="cart-item__price">
                  {{ item.price | currency({symbol: getCurrencySymbol(currentCurrency.toLowerCase())}) }}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="computedCart.length <= 0" class="alert alert-info">
          Cart is empty
        </div>
      </div>
      <div class="cart__footer">
        <div class="cart__total">
          <span>Subtotal</span>
          <span> {{ cartSubTotal | currency({symbol: getCurrencySymbol(currentCurrency.toLowerCase())}) }}</span>
        </div>
        <button class="btn">
          Make this a subscription (save 20%)
        </button>
        <button @click.stop="proceedToCheckout()" :disabled="computedCart.length <= 0" class="btn btn-primary">
          Proceed To checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  components: {
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
    showCart: {
      type: Boolean,
      default() {
        return true
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
      return this.cart.map(cartproduct => {
        const foundProduct = this.products.find((itemForSale) => cartproduct.id === itemForSale.id)
        foundProduct.quantity = cartproduct.quantity
        return foundProduct
      })
    }
  },
  methods: {
    onChange(event) {
      this.selectCurrency(event.target.value)
    },
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
    },
    closeCart() {
      this.$eventBus.$emit('close-cart')
    },
    removeProduct(product) {
      this.$eventBus.$emit('remove-product', { product })
    },
    quantityChange(product, action) {
      this.$eventBus.$emit('quantity-change', { product, action })
    }
  }
}
</script>

<style scoped lang="scss">
.cart__widget {
  @apply fixed top-0 right-0 h-screen w-screen flex justify-end;
  background: #00000038;

  .cart__content {
    @apply flex flex-col;
    min-width: 40rem;
    background-color: #e2e6e3;
    overflow-y: scroll;

    header {
      @apply relative mx-3 py-3 uppercase;

      .cart__heading {
        @apply text-center;
      }

      .go-back {
        @apply absolute left-0 top-0 mt-2 rounded-full w-6 h-6  flex items-center justify-center;
        border: 1px solid;

        img {
          @apply h-3;
        }
      }

      .currency-selection {
        @apply bg-white py-1 px-3 mt-2 mb-1 inline-flex items-center;
      }
    }

    .cart__items-wrapper {
      @apply flex-grow;

      .cart__body {
        .cart-item {
          @apply bg-white mx-3 py-4 mb-4;

          .item__head {
            @apply flex flex-row-reverse justify-between items-center px-2;

            .cart-item__name {
              margin-left: 0.5em;
              vertical-align: middle;
            }
          }

          .cart-item__image {
            @apply flex justify-end px-10 py-8;

            img {
              @apply h-16;
            }
          }

          .cart-item__desc-wrap {
            @apply grid col-gap-5 px-3 items-center;
            grid-template-columns: 4rem 1fr;

            .cart-item__quantity-wrap {
              @apply border py-1 px-2 flex items-center flex-row-reverse justify-between;
            }

            .cart-item__price {
            @apply font-semibold;
            padding-left: 40%;
            }
          }
        }
      }
    }
  }
}

.cart__footer {
  @apply static bottom-0;

  .cart__total {
    @apply font-medium text-xl flex justify-between items-center pt-3 pb-2 border-t mx-3 my-1;
    border-top: 1px solid;
  }

  .btn {
    @apply block py-3 px-10 text-center bg-white;
    border: 1px solid #4b5547;
    width: 96%;
    margin: 1rem 2%;
    text-transform: uppercase;

    &.btn-primary {
      background-color: #4b5547;
      color: white;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
