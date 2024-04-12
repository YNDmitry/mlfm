<script setup>
	defineProps({
		title: {
			type: String,
			required: true,
			default: () => '',
		},
		image: {
			type: String,
			required: true,
		},
		link: {
			type: String,
			required: true,
		},
	})
</script>

<template>
	<NuxtLink :to="link" class="relative">
		<NuxtImg
			provider="directus"
			class="h-full w-full object-cover object-left max-tablet:w-[200px]"
			:src="image"
			width="441"
			height="355"
		/>

		<div
			class="absolute flex flex-col items-start uppercase text-primary max-tablet:bottom-[20px] max-tablet:left-[8px] max-tablet:gap-[7px] tablet:bottom-[25px] tablet:left-[29px] tablet:gap-[17px]"
		>
			<p
				class="text-[14px] font-bold tracking-[2.1px] max-tablet:text-[10px] max-tablet:tracking-[1.5px]"
			>
				{{ title }}
			</p>
			<button
				class="min-w-[8.313rem] rounded-main border-[1px] border-primary font-montserrat text-[0.625rem] font-bold transition-colors hover:bg-primary hover:text-black max-tablet:min-h-[1rem] max-tablet:min-w-[3.75rem] max-tablet:text-[0.5rem] max-tablet:tracking-[0.4px] tablet:min-h-[2.25rem] tablet:tracking-[2.5px]"
			>
				купить
			</button>
		</div>
	</NuxtLink>
</template>
