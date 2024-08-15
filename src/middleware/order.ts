export default defineNuxtRouteMiddleware(async (to, _from) => {
	const config = useRuntimeConfig()
	const toast = useToast()
	const {isAuthenticated} = useUserStore()
	const isPinValid = useState('isOrderPinValid')
	const userToken = useCookie('directus_token') // допустим, токен хранится в стейте
	const orderProduct = useState('order-product')
	const orderProducts = useState('order-products')

	// Проверяем, есть ли параметр ID заказа в query или params
	const orderId = to.query.id || to.params.id
	const pin = to.query.pin

	if (orderId) {
		try {
			let res
			if (pin) {
				// Если есть PIN, проверяем заказ по PIN (можно без аутентификации)
				res = await fetch(`${config.public.databaseUrl}/check-pin`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: orderId,
						pin: pin,
					}),
				})
			} else if (isAuthenticated && userToken.value) {
				// Если пользователь аутентифицирован, запрашиваем заказ по ID
				res = await fetch(
					`${config.public.databaseUrl}items/customer_orders/${orderId}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${userToken.value}`,
						},
					},
				)
			} else {
				// Если пользователь не аутентифицирован и нет PIN, редиректим на страницу логина
				return
			}

			const data = await res.json()

			if (data) {
				orderProduct.value = data.data
				isPinValid.value = true

				// Запрашиваем продукты заказа, если они есть
				if (data?.data.products) {
					const currentProducts = await GqlOrderProducts({
						ids: data?.data.products,
					})
					orderProducts.value = currentProducts.product_variants
				}
			} else {
				toast.add({
					severity: 'error',
					detail: 'Заказ не найден или PIN неверен',
					summary: 'Ошибка',
					life: 3000,
				})
				return navigateTo('/') // редиректим на главную или другую страницу
			}
		} catch (error) {
			toast.add({
				severity: 'error',
				detail: 'Что-то пошло не так. Попробуйте ещё раз',
				summary: 'Ошибка',
				life: 3000,
			})
			return navigateTo('/') // редиректим на главную или другую страницу
		}
	} else {
		// Если ID заказа не предоставлен, показываем ошибку или редиректим
		toast.add({
			severity: 'error',
			detail: 'ID заказа не предоставлен',
			summary: 'Ошибка',
			life: 3000,
		})
		return navigateTo('/')
	}
})
