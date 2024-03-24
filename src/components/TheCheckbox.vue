<script setup>
	defineProps({
		label: {
			type: String,
			required: true,
		},
		labelLink: {
			type: String,
			required: false,
		},
		link: {
			type: String,
			required: false,
		},
		inputName: {
			type: String,
			required: true,
		},
		isRequired: {
			type: Boolean,
			required: false,
			default: false,
		},
		initialValue: {
			type: Boolean,
			required: false,
			default: false,
		},
	})
</script>

<template>
	<label
		class="gray flex w-full cursor-pointer flex-col gap-[0.625rem] pt-[0.938rem]"
		:for="inputName"
	>
		<Field
			as="checkbox"
			:name="inputName"
			:id="inputName"
			class="absolute h-5 w-5 cursor-pointer opacity-0"
		/>

		<div class="flex items-center gap-[0.625rem]">
			<div
				class="flex h-5 min-h-5 w-5 min-w-5 cursor-pointer items-center justify-center border-[1px] border-grayLight"
			>
				<IconsCheck />
			</div>

			<p class="border-darkGray2 text-[10px]">
				{{ label }}

				<NuxtLink :to="link" v-if="link" class="underline">{{
					labelLink
				}}</NuxtLink>
			</p>
		</div>

		<ErrorMessage :name="inputName" class="mt-1 text-[0.625rem] text-[red]" />
	</label>
</template>
