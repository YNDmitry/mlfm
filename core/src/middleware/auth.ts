export default defineNuxtRouteMiddleware(async (to, _from) => {
	const {fetchUser, setUser} = useDirectusAuth()
	let currentUser = useDirectusUser()

	// Проверяем, загружены ли данные пользователя, чтобы избежать повторного fetch-а
	if (!currentUser.value) {
		currentUser = await fetchUser()
		setUser(currentUser.value)
	}

	// Проверка на наличие токена для сброса пароля
	const hasResetToken = to.query.token

	if (
		!currentUser.value &&
		to.path !== '/auth/log-in' &&
		to.path !== '/auth/sign-up' &&
		!(to.path === '/auth/reset-password' && hasResetToken)
	) {
		return navigateTo('/auth/log-in')
	} else if (currentUser.value && /^\/auth\//.test(to.path)) {
		return navigateTo('/profile')
	}
})
