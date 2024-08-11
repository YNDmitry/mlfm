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
	status: {}
}

export function useProducts() {
	const route = useRoute()

	const filterObj = computed(() => {
		const obj = ref({} as filterObject)

		obj.value.status = {_eq: 'published'}

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

	const productCount: any = ref(0)
	const isProductLoading = ref(true)

	const refresh = async (page: number, limit: number, sort: any) => {
		const res = await GqlProducts({
			page: page + 1,
			limit: limit,
			sort: [sort],
			filter: filterObj.value.value,
		})

		productCount.value = res.products_aggregated[0].count?.id
		isProductLoading.value = false

		return {
			products: res.products,
			totalProducts: productCount,
			isLoading: isProductLoading,
		} // Вернем продукты
	}

	return {
		refresh,
		isProductLoading,
	}
}
