export default defineNuxtRouteMiddleware(async (to, from) => {
	const existingCheckoutSessionId = to.params.id as string

	try {
		const data = await GqlGetCheckoutSession({
			id: existingCheckoutSessionId,
		})

		const existingSession = data?.checkout_sessions_by_id
		// Проверка, не истекла ли сессия
		const currentTimeUTC = new Date().toISOString()
		const sessionExpiryTimeUTC = existingSession?.expires_at

		if (existingSession && sessionExpiryTimeUTC > currentTimeUTC) {
			// Сессия актуальна, разрешаем переход на страницу оформления заказа
			return
		} else {
			throw createError({
				statusCode: 400,
				statusMessage: 'Сессия истекла, создайте заказ заново',
			})
		}
	} catch (error) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Сессия истекла, создайте заказ заново',
		})
	}
})
