// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {enabled: true},
	srcDir: 'src/',
	serverDir: 'server/',

	app: {
		pageTransition: {name: 'page', mode: 'out-in'},
		layoutTransition: {name: 'layout', mode: 'out-in'},
	},

	css: ['~/assets/css/global.css'],

	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/image',
		'@nuxtjs/robots',
		'nuxt-simple-sitemap',
		'nuxt-directus',
		'nuxt-link-checker',
		'@nuxtjs/google-fonts',
		'@vee-validate/nuxt',
		'nuxt-primevue',
	],

	plugins: ['./src/plugins/preview.client.ts'],

	directus: {
		url: process.env.DATABASE_URL,
		autoFetch: false,
	},

	googleFonts: {
		families: {
			Unbounded: {
				wght: [300, 400, 500, 700],
			},
		},
	},

	primevue: {
		components: {
			exclude: ['Tooltip', 'Toast'],
		},
	},

	runtimeConfig: {
		public: {
			GQL_HOST: process.env.GQL_HOST,
		},
	},
})
