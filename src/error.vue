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
</script>

<template>
	<div>
		<NuxtLayout>
			<div class="container">
				<div class="py-12 text-center">
					<h1>{{ error?.statusCode }}</h1>
					<p class="mt-2 mb-6">{{ message }}</p>
					<div class="max-w-96 w-full mx-auto">
						<UIButton
							@click="handleError"
							title="Вернуться на главную"
						></UIButton>
					</div>
				</div>
			</div>
		</NuxtLayout>
	</div>
</template>
