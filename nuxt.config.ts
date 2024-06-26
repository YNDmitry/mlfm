import commonjs from '@rollup/plugin-commonjs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {enabled: true},
	srcDir: 'src/',
	serverDir: 'server/',

	app: {
		pageTransition: {name: 'page', mode: 'out-in'},
		layoutTransition: {name: 'layout', mode: 'out-in'},

		head: {
			htmlAttrs: {
				lang: 'ru',
			},
			link: [{rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg'}],
		},
	},

	routeRules: {
		'/': {prerender: true},
		'/auth/*': {
			ssr: false,
			index: false,
		},
		'/orders/*': {
			ssr: false,
			index: false,
		},
		'/profile': {
			ssr: false,
			index: false,
		},
		'/checkout/*': {
			ssr: false,
			index: false,
		},
		'/wishlist': {
			ssr: false,
			index: false,
		},
	},

	runtimeConfig: {
		public: {
			databaseUrl: process.env.DATABASE_URL,
			GQL_HOST: process.env.DATABASE_URL + 'graphql',
		},
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
		'@nuxtjs/sitemap',
		'nuxt-directus',
		'@vee-validate/nuxt',
		'nuxt-primevue',
		'nuxt-swiper',
		'@formkit/auto-animate',
		'@nuxt/fonts',
		'nuxt-graphql-client',
		'@nuxt/test-utils/module',
	],

	image: {
		format: ['webp'],
		densities: [2, 1],
		directus: {
			baseURL: process.env.DATABASE_URL + 'assets/',
		},
	},

	directus: {
		url: process.env.DATABASE_URL,
		autoFetch: false,
	},

	robots: {
		Sitemap: (req: any) => `https://${req.headers.host}/sitemap.xml`,
	},

	primevue: {
		components: {
			include: [
				'Tooltip',
				'Toast',
				'TabView',
				'TabPanel',
				'Toast',
				'ScrollPanel',
				'Sidebar',
				'Breadcrumb',
				'Paginator',
				'Accordion',
				'AccordionTab',
				'Image',
				'Dialog',
				'Dropdown',
				'Checkbox',
				'ProgressSpinner',
				'RadioButton',
				'Skeleton',
				'InputMask',
				'InputNumber',
				'SpeedDial',
				'InputOtp',
			],
		},
	},

	telemetry: false,
})
