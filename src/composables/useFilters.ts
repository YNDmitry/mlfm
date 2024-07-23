import {useRoute, useRouter} from 'vue-router'
import {ref, reactive, watch} from 'vue'

export function useFilters() {
	const route = useRoute()
	const router = useRouter()
	const currentPage = ref(0)
	const currentLimit = ref(9)
	const currentSort = ref('')
	const filters = reactive({
		brandTitle: null,
		collectionId: route.query.collection || null,
		colors: route.query.color ? route.query.color.split(',') : null,
		size: route.query.size || null,
		categories: route.query.category ? route.query.category.split(',') : null,
		minPrice: route.query.minPrice || null,
		maxPrice: route.query.maxPrice || null,
	})

	watch(
		() => filters,
		(newFilters) => {
			const queryParams = Object.entries(newFilters).reduce(
				(acc, [key, value]) => {
					if (value) {
						if (Array.isArray(value) && value.length > 0) {
							acc[key] = value.join(',')
						} else if (!Array.isArray(value) && value !== '') {
							acc[key] = value
						}
					}
					return acc
				},
				{} as Record<string, any>,
			)
			router.push({query: queryParams})
		},
		{deep: true},
	)

	return {
		currentPage,
		currentLimit,
		currentSort,
		filters,
	}
}
