import {jwtPayload} from '../../../utils/jwt-payload'

export default defineEventHandler(async (event) => {
	try {
		const query: any = getQuery(event) as string

		const {email, scope} = jwtPayload(query.token)

		if (scope !== 'pending-registration') {
			throw createError({statusCode: 403, message: 'Forbidden'})
		}

		// Если токен корректен и scope === 'pending-registration', выводим сообщение в консоль
		console.log(`User with email: ${email} has a pending registration.`)

		// Перенаправление пользователя на страницу /profile
		// navigateTo('/profile')
		sendRedirect(event, '/profile')
	} catch (error: any) {
		throw createError({
			statusCode: error?.statusCode || 500,
			message: error?.message || 'Internal Server Error',
		})
	}
})
