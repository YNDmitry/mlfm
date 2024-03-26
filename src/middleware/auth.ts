export default defineNuxtRouteMiddleware(async (to, _from) => {
	const {fetchUser, setUser} = useDirectusAuth()
	let currentUser = useDirectusUser()

	// Проверяем, загружены ли данные пользователя, чтобы избежать повторного fetch-а
	if (!currentUser.value) {
		currentUser = await fetchUser()
		setUser(currentUser.value)
	}

	// Если пользователь не авторизован и пытается получить доступ к странице восстановления пароля
	if (!currentUser.value && to.path === '/auth/reset-password') {
		// Проверяем наличие токена в query параметрах
		const token = to.query.token

		// Если токен есть, выполняем проверку валидности
		if (token) {
			const isValidToken = await validateToken(token) // Здесь validateToken - это ваша функция для проверки токена

			// Если токен валиден, разрешаем доступ на страницу
			if (isValidToken) {
				return // Разрешаем доступ к маршруту
			}
		} else {
			navigateTo('/auth/log-in')
		}
	}

	if (
		!currentUser.value &&
		to.path !== '/auth/log-in' &&
		to.path !== '/auth/sign-up'
	) {
		return navigateTo('/auth/log-in')
	} else if (currentUser.value && /^\/auth\//.test(to.path)) {
		return navigateTo('/profile')
	}
})

// Здесь предполагается, что у вас есть функция `validateToken`, которая возвращает Promise с результатом проверки токена
async function validateToken(token: string) {
	// Тут должен быть ваш код для проверки валидности токена, например, вызов к API
	// Пример возвращаемого значения:
	return true // или false, в зависимости от результата проверки
}
