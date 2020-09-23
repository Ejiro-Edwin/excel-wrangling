require("dotenv").config();
module.exports = {
  mode: "universal",
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 7000
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'excel-wrangling',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],
  serverMiddleware: ["~/server/app"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {}
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    db_name: process.env.db_name,
    db_user: process.env.db_user,
    db_pass: process.env.db_pass,
    db_host: process.env.db_host,
    endPoint: process.env.endPoint
  }
}
