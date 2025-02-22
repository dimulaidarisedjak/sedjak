import Aura from "@primevue/themes/aura";

const isProd = process.env.NODE_ENV === "production";

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxthub/core",
    "@nuxtjs/kinde",
    "@nuxtjs/tailwindcss",
    "nuxt-security",
    "@nuxtjs/color-mode",
    "@primevue/nuxt-module",
    "@nuxt/icon",
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    app: {
      name: "",
      url: "",
    },
    mail: {
      key: "",
      from: "",
    },
  },
  routeRules: {
    "/api/me": {
      security: {
        rateLimiter: {
          headers: false,
          interval: 60 * 1000,
          tokensPerInterval: 6,
        },
      },
    },
    "/api/_hub/**": {
      csurf: false,
    },
    "/**": {
      security: {
        rateLimiter: false,
      },
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-04-03",
  hub: {
    database: true,
    blob: true,
    kv: true,
  },
  csurf: {
    methodsToProtect: ["POST", "PUT", "PATCH", "DELETE"],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  kinde: {
    debug: true,
    password: process.env.NUXT_KINDE_PASSWORD,
    authDomain: process.env.NUXT_KINDE_AUTH_DOMAIN,
    clientId: process.env.NUXT_KINDE_CLIENT_ID,
    redirectURL: process.env.NUXT_KINDE_REDIRECT_URL,
    logoutRedirectURL: process.env.NUXT_KINDE_LOGOUT_REDIRECT_URL,
    postLoginRedirectURL: process.env.NUXT_KINDE_POST_LOGIN_REDIRECT_URL,
    clientSecret: process.env.NUXT_KINDE_CLIENT_SECRET,
    audience: process.env.NUXT_KINDE_AUDIENCE,
  },
  primevue: {
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: ".dark-mode",
          cssLayer: false,
        },
      },
    },
  },
  security: {
    csrf: true,
    rateLimiter: {
      driver: {
        name: "cloudflare-kv-binding",
        options: {
          binding: "KV",
        },
      },
    },
    headers: {
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "https://avatars.githubusercontent.com",
          "https://static-cdn.jtvnw.net/",
        ],
        // "script-src": [
        //   "'self'",
        //   "https",
        //   "'nonce-{{nonce}}'",
        //   "https://static.cloudflareinsights.com",
        // ],
      },
      crossOriginEmbedderPolicy: isProd ? "credentialless" : false,
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    exposeConfig: false,
    viewer: true,
  },
});
