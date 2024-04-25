import {
	createDirectus,
	rest,
	aggregate,
	createItem,
	passwordRequest,
	passwordReset,
	updateMe,
	authentication,
	verifyHash,
} from '@directus/sdk'

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig()

	const directus = createDirectus(config.public.databaseUrl)
		.with(rest())
		.with(authentication())
	return {
		provide: {
			directus,
			aggregate,
			createItem,
			passwordRequest,
			passwordReset,
			updateMe,
			verifyHash,
		},
	}
})
