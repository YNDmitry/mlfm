import {jwtPayload} from '~/utils/jwt-payload'

export default defineEventHandler((event) => {
	const query: any = getQuery(event) as string

	const {email, scope} = jwtPayload(query.token)

	if (scope !== 'pending-registration') throw createError({statusCode: 403})

	return {
		query,
	}
})
