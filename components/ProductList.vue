<template>
  <div>
    <ul class="product-list">
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
  },
  computed: {},
  methods: {}
}
</script>

<style scoped lang="scss">
.product-list {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
}
.product-list__item {
  list-style: none;
  width: 32%;
}
</style>
