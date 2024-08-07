import Aura from '@primevue/themes/aura'

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

	css: ['~/assets/css/global.css'],

	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/image',
		'@nuxtjs/robots',
		'@nuxtjs/sitemap',
		'nuxt-directus',
		'@vee-validate/nuxt',
		'nuxt-swiper',
		'@formkit/auto-animate',
		'@nuxt/fonts',
		'nuxt-graphql-client',
		'@primevue/nuxt-module',
		'@nuxt/test-utils/module',
		'@nuxtjs/device',
		'nuxt-schema-org',
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
		options: {
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: '',
					cssLayer: true,
				},
			},
		},
		components: {
			include: [
				'Tooltip',
				'Toast',
				'Tabs',
				'TabList',
				'Tab',
				'TabPanels',
				'TabPanel',
				'Toast',
				'ScrollPanel',
				'Drawer',
				'Breadcrumb',
				'Paginator',
				'Accordion',
				'AccordionPanel',
				'AccordionHeader',
				'AccordionContent',
				'Image',
				'Dialog',
				'Select',
				'Checkbox',
				'ProgressSpinner',
				'RadioButton',
				'Skeleton',
				'InputMask',
				'InputNumber',
				'SpeedDial',
				'InputOtp',
				'Message',
			],
		},
	},

	telemetry: false,
	compatibilityDate: '2024-07-06',

	site: {
		url: 'https://www.mlfm.store',
		name: 'MLFM',
	},

	schemaOrg: {
		identity: {
			type: 'Organization',
			name: 'My Company',
			url: 'https://example.com',
			logo: 'https://example.com/logo.png',
		},
	},
})
