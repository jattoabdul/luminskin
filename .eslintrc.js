module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-irregular-whitespace': 0,
    'arrow-parens': 0,
    'vue/no-v-html': 0,
    'camelcase': 0,
    'dot-notation': 1,
    'space-before-function-paren': 0
  }
}
