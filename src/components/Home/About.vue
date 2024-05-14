<script lang="ts" setup>
	defineProps({
		config: {
			type: Object,
		},
	})
</script>

<template>
	<section class="max-mobile:py-[30px] mobile:py-[77px]">
		<div class="mx-auto my-0 max-w-[1095px] px-4">
			<div
				class="flex items-center justify-between max-tablet:flex-col max-mobile:gap-[8px] mobile:gap-5"
			>
				<div
					class="max-tablet:max-w-none max-mobile:mb-4 max-mobile:max-w-none tablet:max-w-[370px]"
				>
					<h2
						class="text-h2 font-bold uppercase text-red2 max-tablet:text-h2Mob max-mobile:tracking-[2.5px] mobile:tracking-[5.25px]"
					>
						Фирменный магазин
					</h2>

					<p
						class="font-montserrat text-[0.8rem] max-mobile:pt-[12px] mobile:pt-[27px]"
					>
						MLFM - это эксклюзивный магазин, основанный в 2014 году, который
						специализируется на продаже уникальных винтажных украшений и одежды.
						Мы предлагаем нашим клиентам только самые изысканные и стильные
						аксессуары, которые подчеркнут вашу индивидуальность и сделают ваш
						образ неповторимым.
					</p>

					<div
						class="flex flex-col gap-[15px] font-montserrat text-[14px] leading-[20px] max-mobile:hidden max-mobile:pt-[12px] mobile:pt-[27px]"
					>
						<span>{{ config?.current_address }}</span>

						<b>{{ config?.current_phone_number }}</b>
					</div>
				</div>

				<div class="max-tablet:mt-3 max-tablet:w-full">
					<NuxtImg
						provider="directus"
						src="744ac27e-c809-4bcf-8062-fadfda74377b"
						width="623"
						height="461"
						class="max-tablet:w-full"
						format="webp"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
