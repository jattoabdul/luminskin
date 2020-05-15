<template>
  <div class="product thumbnail">
    <img :src="product.image_url" :alt="product.title" class="product__image">
    <div class="caption">
      <h3 class="product__title">
        {{ product.title }}
      </h3>
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
  display: grid;
  grid-template-rows: 1fr 5rem;
  align-items: flex-end;
  height: 20rem;
  row-gap: 4rem;

  .product__image {
    @apply max-w-full max-h-full block mx-auto;
  }

  .caption {
    @apply text-center;
  }
  .product__title {
    @apply text-base font-semibold;
  }
}
.product__price {
  @apply my-1 text-xl;
}
.product__button-wrap {
  @apply flex justify-center;
}

.btn {
  @apply block mx-auto px-10 py-2 text-white text-base  my-2;
  background-color: #4b5547;
}
</style>
