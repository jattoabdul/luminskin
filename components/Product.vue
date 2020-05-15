<template>
  <div class="product thumbnail">
    <img :src="product.image_url" :alt="product.title">
    <div class="caption">
      <h3>{{ product.title }}</h3>
      <div class="product__price">
        {{ product.price | currency({symbol: getCurrencySymbol(currentCurrency.toLowerCase())}) }}
      </div>
      <div class="product__button-wrap">
        <button
          @click.stop="addToCart(product)"
          class="btn btn-primary"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: {
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
  computed: {},
  methods: {
    addToCart(product) {
      this.$eventBus.$emit('add-to-cart', { product })
    }
  }
}
</script>

<style scoped lang="scss">
.product {
  overflow: hidden;
}
.product__price {
  display: inline-block;
  line-height: 34px;
}
.product__button-wrap {
  float: right;
}
</style>
