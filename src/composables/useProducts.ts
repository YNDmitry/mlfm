// composables/useProducts.ts
import {reactive, toRefs} from 'vue'
const {getItems} = useDirectusItems()

export function useProducts() {
	const state = reactive({
		products: [],
		isLoading: false,
		error: null,
	})

	async function fetchProducts(
		filters: any,
		productsPerPage: number,
		currentPage: number,
	) {
		state.isLoading = true
		try {
			const response = await getItems({
				collection: 'products',
				params: {
					fields: ['title', 'price', 'main_image', 'id'],
					sort: ['-date_created'],
					filter: filters,
					limit: productsPerPage,
					offset: currentPage,
				},
			})
			state.products = response as any
		} catch (err) {
			state.error = err as any
		} finally {
			state.isLoading = false
		}
	}

	return {
		...toRefs(state),
		fetchProducts,
	}
}
