import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
	app: {
		pageTransition: {name: 'page', mode: 'out-in'},
		layoutTransition: {name: 'layout', mode: 'out-in'},

		head: {
			htmlAttrs: {
				lang: 'ru',
			},
			link: [{rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg'}],
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
				},
			],
			script: [
				{
					src: 'https://umami.mlfm.store/script.js',
					defer: true,
					'data-website-id': 'e4df7543-c20b-4932-8489-bc29d2f0af2c',
				},
			],
		},
	},

	srcDir: 'src/',
	serverDir: 'server/',

	css: ['./src/assets/css/global.css'],

	routeRules: {
		'/': {
			prerender: true,
		},
		'/about': {
			prerender: true,
		},
		'/gift-card': {
			prerender: true,
		},
		'/contact-us': {
			prerender: true,
		},
		'/docs/offer': {
			prerender: true,
		},
		'/docs/privacy': {
			prerender: true,
		},
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
			'graphql-client': {
				clients: {
					default: {
						host: 'https://admin.mlfm.store/graphql',
					},
				},
			},
		},
	},

	graphql: {
		clients: {
			profile: {
				endpoint: 'https://admin.mlfm.store/graphql',
			},
		},
	},

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
		'nuxt-graphql-request',
		'@nuxt/scripts',
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
		sitemap: (req) => `https://${req.headers.host}/sitemap.xml`,
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
				'TreeSelect',
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
				'Carousel',
			],
		},
	},

	telemetry: false,
	compatibilityDate: '2024-07-06',

	site: {
		url: 'https://www.mlfm.store',
		name: 'MLFM',
	},

	device: {
		refreshOnResize: true,
	},

	schemaOrg: {
		identity: {
			type: 'Organization',
			name: 'MLFM',
			url: 'https://mlfm.store',
			logo: 'https://admin.mlfm.store/assets/918c4e74-9193-418f-a972-db7fbefd62c8',
		},
	},

	pinia: {
		storesDirs: [
			'./src/stores/**',
			'../layers/site/stores/**',
			'../layers/checkout/stores/**',
		],
	},
})
