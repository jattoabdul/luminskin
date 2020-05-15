<template>
  <li class="cart-item">
    <div>
      <button @click.stop="removeProduct(item)" class="btn btn-danger btn-xs">
        X
      </button>
      <span class="cart-item__name">
        {{ item.title }}
      </span>
    </div>
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
    <div class="cart-item__image">
      <img :src="item.image_url" :alt="item.title">
    </div>
  </li>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    currentCurrency: {
      type: String,
      default() {
        return 'USD'
      }
    }
  },
  methods: {
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
.cart-item {
  margin-bottom: 0.3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-item__name {
  margin-left: 0.5em;
  vertical-align: middle;
}
.cart-item__price {
  font-weight: bold;
}
</style>
