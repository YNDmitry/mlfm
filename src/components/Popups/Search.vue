<script lang="ts" setup>
	import {object, string} from 'yup'
	const websiteStore = useWebsiteStore()

	const schema = object({
		search: string().required('Обязательное поле'),
	})

	const {handleSubmit, isSubmitting} = useForm({
		validationSchema: schema,
	})

	const currentProducts: any = ref([])
	const isNothingFound = ref(false)

	const input = useField('search')

	const onSubmit = handleSubmit(async (values) => {
		const res = await GqlSearchProducts({title: values.search})

		if (res.products.length === 0) {
			isNothingFound.value = true
		} else {
			isNothingFound.value = false
		}
		return (currentProducts.value = res.products)
	})
</script>

<template>
	<Dialog
		position="top"
		modal
		v-model:visible="websiteStore.isSearchPopup"
		:pt="{
			root: 'mt-0 mx-0 rounded-[0] w-full',
		}"
	>
		<template #header>
			<div class="text-[20px]">Поиск</div>
		</template>
		<div>
			<form
				@submit.prevent="onSubmit"
				class="sticky top-0 z-10 bg-primary pb-4"
			>
				<div class="w-full">
					<label
						for="search"
						:disabled="isSubmitting"
						class="disabled:opacity-50"
					>
						<span>Введите имя продукта</span>
						<div class="relative">
							<TheInput
								class="mt-2"
								id="search"
								input-name="search"
								input-placeholder="Название продукта"
								input-type="text"
							/>
							<button
								aria-label="Найти"
								:disabled="!input.value.value"
								type="submit"
								class="absolute bottom-0 right-0 top-0 h-[48px] min-w-36 rounded-main bg-red px-4 text-primary transition-all hover:bg-red2-hover disabled:pointer-events-none disabled:opacity-60 max-tablet:h-[2.5rem]"
							>
								Найти
							</button>
						</div>
					</label>
				</div>
			</form>
			<div
				class="mt-8 grid grid-cols-[repeat(6,_1fr)] gap-6 overflow-y-auto max-laptop:grid-cols-[repeat(4,_1fr)] max-tablet:grid-cols-[repeat(2,_1fr)]"
				data-lenis-prevent
			>
				<template v-if="isSubmitting">
					<div class="flex w-full flex-col" v-for="(item, idx) in 6" :key="idx">
						<Skeleton width="15.625rem" height="20rem" />
						<Skeleton width="10rem" height="1rem" class="mt-2" />
						<Skeleton width="5rem" height="1rem" class="mt-2" />
					</div>
				</template>
				<template
					v-if="currentProducts.length > 0 && !isNothingFound && !isSubmitting"
				>
					<template v-for="item in currentProducts" :key="item.id">
						<ProductCard
							:id="item.id"
							:slug="item.slug"
							:title="item.title"
							:price="item.product_variants[0].price"
							:imgSrc="item.main_image.id"
							@click="websiteStore.isSearchPopup = false"
						/>
					</template>
				</template>
			</div>
			<div v-if="isNothingFound" class="py-5 text-center">
				Ничего не найдено
			</div>
		</div>
	</Dialog>
</template>
