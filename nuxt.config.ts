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
		'nuxt-lenis',
		'@formkit/auto-animate',
		'nuxt-build-cache',
		'@nuxt/fonts',
		'nuxt-graphql-client',
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
		Sitemap: (req: string) => `https://${req.headers.host}/sitemap.xml`,
	},

	primevue: {
		components: {
			include: [
				'Tooltip',
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
				'Toast',
				'RadioButton',
				'Skeleton',
			],
		},
	},
})
