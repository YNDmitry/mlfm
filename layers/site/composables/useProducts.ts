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
	stone: {
		title: {}
	}
	material: {
		title: {}
	}
}

export function useProducts() {
	const route = useRoute()

	const activeFiltersCount = computed(() => {
		let count = 0

		if (route.query.brand) count++
		if (route.query.stone) count++
		if (route.query.material) count++
		if (route.query.collectionId) count++
		if (route.query.color) count++
		if (route.query.size) count++
		if (route.query.category && route.query.category.length > 0) count++
		if (route.query.minPrice) count++
		if (route.query.maxPrice) count++

		return count
	})

	const filterObj = computed(() => {
		const obj = ref({} as filterObject)

		obj.value.status = {_eq: 'published'}

		if (route.query.brand) {
			obj.value.brand = {title: {_eq: route.query.brand}}
		}

		if (route.query.stone) {
			obj.value.stone = {title: {_eq: route.query.stone}}
		}

		if (route.query.material) {
			obj.value.material = {title: {_eq: route.query.material}}
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
			activeFiltersCount: activeFiltersCount.value,
		}
	}

	return {
		refresh,
		isProductLoading,
		activeFiltersCount,
	}
}
