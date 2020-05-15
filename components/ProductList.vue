<template>
  <div>
    <ul class="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-32 row-gap-20">
      <li v-for="product in products" :key="product.id" class="product-list__item">
        <product :product="product" :current-currency="currentCurrency" />
      </li>
    </ul>
  </div>
</template>

<script>
import Product from './Product.vue'

export default {
  name: 'ProductList',
  components: {
    Product
  },
  props: {
    products: {
      type: Array,
      default() {
        return []
      }
    },
    currentCurrency: {
      type: String,
      default() {
        return 'USD'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.product-list {
  @apply px-24 py-24;
  background-color: #e2e6e3;
}
.product-list__item {
  list-style: none;
}
</style>
