<script setup lang="ts">
	import type {NuxtError} from '#app'

	const props = defineProps({
		error: Object as () => NuxtError,
	})

	const handleError = () => clearError({redirect: '/'})

	const message =
		props.error?.statusCode === 404
			? 'Страница не найдена'
			: props.error?.statusMessage

	useHead({
		title: `${props.error?.statusCode === 404 ? 'Страница не найдена' : props.error?.statusMessage} | MLFM`,
	})
</script>

<template>
	<div>
		<NuxtLayout>
			<div class="container">
				<div class="py-12 text-center">
					<h1>{{ error?.statusCode }}</h1>
					<p class="mb-6 mt-2">{{ message }}</p>
					<div class="mx-auto w-full max-w-96">
						<button
							@click="handleError"
							class="h-11 rounded-main bg-red2 px-7 font-montserrat text-[0.75rem] font-bold uppercase tracking-[3px] text-primary transition-colors hover:bg-red2-hover"
						>
							Вернуться на главную
						</button>
					</div>
				</div>
			</div>
		</NuxtLayout>
	</div>
</template>
