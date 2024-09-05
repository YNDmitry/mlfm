console.log('Adding layer: site')

export default defineNuxtConfig({
	components: [
		{
			// can be relative, alias or absolute
			path: 'components',

			// ensure contact form is accessible in Nuxt content
			// the alternative would be to rename it ContactForm.global.vue
			global: true,
		},
	],
})
