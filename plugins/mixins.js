import Vue from 'vue'
import getSymbolFromCurrency from 'currency-symbol-map'

Vue.mixin({
  methods: {
    getCurrencySymbol(currency) {
      const foundCurrency = getSymbolFromCurrency(currency)
      if (foundCurrency) {
        return foundCurrency
      }
      return currency
    },
    isEqual(value, other) {
      // Get the value type
      const type = Object.prototype.toString.call(value)

      // If the two objects are not the same type, return false
      if (type !== Object.prototype.toString.call(other)) { return false }

      // If items are not an object or array, return false
      if (!['[object Array]', '[object Object]'].includes(type)) { return false }

      // Compare the length of the length of the two items
      const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length
      const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length
      if (valueLen !== otherLen) { return false }

      // Compare two items
      const compare = (item1, item2) => {
        // Get the object type
        const itemType = Object.prototype.toString.call(item1)

        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].includes(itemType)) {
          if (!this.isEqual(item1, item2)) { return false }
        } else { // Otherwise, do a simple comparison
          // If the two items are not the same type, return false
          if (itemType !== Object.prototype.toString.call(item2)) { return false }

          // Else if it's a function, convert to a string and compare
          // Otherwise, just compare
          if (itemType === '[object Function]') {
            if (item1.toString() !== item2.toString()) { return false }
          } else if (item1 !== item2) { return false }
        }
      }

      // Compare properties
      if (type === '[object Array]') {
        for (let i = 0; i < valueLen; i++) {
          if (compare(value[i], other[i]) === false) { return false }
        }
      } else {
        for (const key in value) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            if (compare(value[key], other[key]) === false) { return false }
          }
        }
      }

      // If nothing failed, return true
      return true
    }
  }
})
