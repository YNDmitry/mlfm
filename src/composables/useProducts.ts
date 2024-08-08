interface filterObject {
	brand: {
		title: {}
	}
	collection: {
		title: {}
	}
	colors: {
		colors_id: {}
	}
	sizes: {
		sizes_id: {}
	}
	category: {
		title: {}
	}
	price: {}
}

export function useProducts(
	currentSort: any,
	currentPage: any,
	currentLimit: any,
) {
	const route = useRoute()

	const filterObj = computed(() => {
		const obj = ref({} as filterObject)

		if (route.query.brand) {
			obj.value.brand = {title: {_eq: route.query.brand}}
		}

		if (route.query.collectionId) {
			obj.value.collection = {title: {_eq: route.query.collectionId}}
		}

		if (route.query.color) {
			obj.value.colors = {colors_id: {title: {_eq: route.query.color}}}
		}

		if (route.query.size) {
			obj.value.sizes = {sizes_id: {small_title: {_eq: route.query.size}}}
		}

		if (route.query.category && route.query.category.length > 0) {
			obj.value.category = {title: {_in: route.query.category}}
		}

		if (route.query.minPrice) {
			obj.value.price = {_gte: route.query.minPrice}
		}

		if (route.query.maxPrice) {
			obj.value.price = {
				...(obj.value.price || {}),
				_lte: route.query.maxPrice,
			}
		}

		return obj
	})

	const products: any = ref(null)
	const productCount: any = ref(null)
	const isProductLoading = ref(true)
	const refresh = async () => {
		await GqlProducts({
			page: Number(route.query.page) || currentPage + 1,
			limit: Number(route.query.limit) || currentLimit,
			sort: route.query.sort || ['-date_created'],
			filter: filterObj.value.value,
		}).then((res) => {
			products.value = res.products
			productCount.value = res.products_aggregated[0].count.id
			isProductLoading.value = false
		})
	}

	return {
		products,
		productCount,
		refresh,
		isProductLoading,
	}
}
