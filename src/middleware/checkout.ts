export default defineNuxtRouteMiddleware(async (to, from) => {
	const existingCheckoutSessionId = to.params.id as string

	try {
		const data = await GqlGetCheckoutSession({
			id: existingCheckoutSessionId,
		})

		const existingSession = data.checkout_sessions_by_id

		// Проверка, не истекла ли сессия
		const currentTimeUTC = new Date().toISOString()
		const sessionExpiryTimeUTC = existingSession?.expires_at

		console.log('Current time (UTC):', currentTimeUTC)
		console.log('Session expiry time (UTC):', sessionExpiryTimeUTC)

		if (existingSession && sessionExpiryTimeUTC > currentTimeUTC) {
			// Сессия актуальна, разрешаем переход на страницу оформления заказа
			return
		} else {
			console.log('Session expired or not found:', existingSession)
			return navigateTo('/')
		}
	} catch (error) {
		console.error('Error reading existing checkout session:', error)
		localStorage.removeItem('checkoutSessionId') // Удаляем невалидную сессию
		return navigateTo('/')
	}
})
