// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {enabled: true},
	srcDir: 'src/',
	serverDir: 'server/',

	app: {
		pageTransition: {name: 'page', mode: 'out-in'},
		layoutTransition: {name: 'layout', mode: 'out-in'},
	},

	css: [
		'~/assets/css/global.css',
		'primevue/resources/themes/aura-light-green/theme.css',
	],

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
		'nuxt-primevue',
		'nuxt-swiper',
		'nuxt-lenis',
		'@formkit/auto-animate',
	],

	image: {
		quality: 80,
		format: ['webp'],
		densities: [2, 1],
	},

	plugins: ['./src/plugins/preview.client.ts'],

	directus: {
		url: process.env.DATABASE_URL,
		autoFetch: false,
	},

	googleFonts: {
		families: {
			Unbounded: {
				wght: [300, 400, 500, 600, 700],
			},
			Montserrat: {
				wght: [300, 400, 500, 600, 700],
			},
		},
	},

	primevue: {
		components: {
			include: ['Tooltip', 'Toast', 'ScrollPanel', 'Sidebar'],
		},
	},
})
