// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	extends: ['./core', './layers/checkout', './layers/site'],

	devtools: {enabled: true},

	experimental: {
		appManifest: false,
	},
})
