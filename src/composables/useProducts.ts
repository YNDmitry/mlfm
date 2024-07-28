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

export function useProducts(currentSort: any) {
	const route = useRoute()
	const currentPage = useState('currentPage', () => 0)
	const currentLimit = useState('currentLimit', () => 9)

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

	const {data: products, refresh} = useAsyncData('products', () =>
		GqlProducts({
			page: currentPage.value + 1,
			limit: currentLimit.value,
			sort: currentSort?.value.code,
			filter: filterObj.value.value,
		}),
	)

	return {
		products,
		refresh,
	}
}
