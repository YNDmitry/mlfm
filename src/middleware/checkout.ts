export default defineNuxtRouteMiddleware(async (to, _from) => {
	let cartStore = useCartStore()
	const res = cartStore.initCart()

	if (!res) {
		if (cartStore.items.length === 0) {
			return navigateTo('/')
		}
	}
})
