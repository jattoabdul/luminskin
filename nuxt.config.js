import dotenv from 'dotenv'

dotenv.config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Luminskin' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Luminskin'
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'Luminskin'
      },
      { hid: 'og:title', name: 'og:title', content: 'Luminskin' },
      { name: 'msapplication-TileColor', content: '#fff' },
      {
        name: 'msapplication-TileImage',
        content: '/favicons/ms-icon-144x144.png'
      },
      { name: 'theme-color', content: '#fff' }
    ],
    link: [
      // Fonts
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Poppins:400,700,900|Rubik:400,500,600,700,800' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'manifest', href: '/favicons/manifest.json' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/mixins', ssr: true },
    { src: '~/plugins/front-only', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
    // // Doc: https://github.com/nuxt-community/apollo-module
    // '@nuxtjs/apollo'
  ],
  /*
  ** Apollo module configuration
  ** See https://github.com/nuxt-community/apollo-module/options
  */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://pangaea-interviews.now.sh/api/graphql'
        // browserHttpEndpoint: '/graphql',
        // httpLinkOptions: {
        //   credentials: 'same-origin'
        // },
        // wsEndpoint: 'ws://localhost:4000',
        // tokenName: 'apollo-token',
        // persisting: false,
        // websocketsOnly: false
      },
      test: {
        httpEndpoint: 'https://pangaea-interviews.now.sh/api/graphql'
        // wsEndpoint: 'ws://localhost:5000',
        // tokenName: 'apollo-token'
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
   ** Global Env Variables
   */
  env: {
    ApiUrl: process.env.API_URL
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
