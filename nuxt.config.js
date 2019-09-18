const axios = require('axios')

module.exports = {
  store: true,
  /*
  ** Headers of the page
  */
  head: {
    title: 'aroio-gui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'AroioOS configuration' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#0060aa',
    height: '3px'
  },
  css: [
    '~assets/scss/main.scss'
  ],
  router: {
    middleware: 'i18n'
  },
  plugins: [
    '~/plugins/StringSplice.js',
    '~/plugins/RenderContent.js',
    '~/plugins/i18n.js',
    { src: '~/plugins/nuxt-client-init.js', ssr: false }
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes: [
      '/',
      '/convolver',
      '/measure',
      '/network',
      '/system',
      '/credits',
      '/en/',
      '/en/convolver',
      '/en/measure',
      '/en/network',
      '/en/system',
      '/en/credits'
    ]
  },
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],
  bootstrapVue: {
    css: false,
    bvCSS: false,
    componentPlugins: [
      'Navbar',
      'Button',
      'Form',
      'Card',
      'Modal',
      'Tooltip',
      'Progress',
      'LayoutPlugin',
      'ListGroupPlugin',
      'ButtonGroupPlugin',
      'FormRadioPlugin',
      'FormCheckboxPlugin',
      'ButtonToolbarPlugin',
      'FormSelectPlugin',
      'FormInputPlugin',
      'InputGroupPlugin',
    ]
  },
  axios: {
    credentials: true
  }
}
