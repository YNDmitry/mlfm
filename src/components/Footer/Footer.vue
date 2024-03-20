<script setup>
	const config = useState('config')
</script>
<template>
	<footer class="mt-auto border-t border-t-[#B4B4B4] pt-[4rem]">
		<div class="container">
			<div
				class="grid grid-cols-footer gap-8 max-laptop:grid-cols-[1fr_1fr] max-laptop:gap-11"
			>
				<div>
					<div class="text-[1rem] font-bold">Информация</div>
					<ul class="mt-[30px] flex flex-col gap-3">
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink to="/about">О компании</NuxtLink>
						</li>
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink to="/contact-us">Контакты</NuxtLink>
						</li>
					</ul>
				</div>
				<div>
					<div class="text-[1rem] font-bold">Для покупателей</div>
					<ul class="mt-[30px] flex flex-col gap-3">
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink to="/profile">Личный кабинет</NuxtLink>
						</li>
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink>Подарочные сертификаты</NuxtLink>
						</li>
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink to="/docs/conditions">Доставка и оплата</NuxtLink>
						</li>
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink to="/docs/conditions">Публичная оферта</NuxtLink>
						</li>
					</ul>
				</div>
				<div
					class="w-full max-w-[430px] max-tablet:col-span-2 max-tablet:max-w-none max-tablet:text-center"
				>
					<form @submit.prevent>
						<div class="text-[1rem] font-bold">У нас прекрасные новости</div>
						<p
							class="mt-[30px] font-montserrat text-[14px] font-normal text-[#6C6C6C] max-tablet:mt-3"
						>
							Лучшие акции, главные новинки и персональные предложения
						</p>
						<div
							class="relative mt-5 flex items-center border-b-[1px] border-b-[#B4B4B4]"
						>
							<input
								type="email"
								name="email"
								placeholder="Введите Email"
								class="min-h-[48px] w-full pr-10 font-montserrat text-[14px] focus:outline-none"
							/>
							<button type="submit" class="absolute right-0">
								<IconsFooterArrow />
							</button>
						</div>
					</form>
				</div>
				<div
					class="max-w-[154px] max-tablet:col-span-2 max-tablet:w-full max-tablet:max-w-none max-tablet:text-center"
				>
					<IconsFooterLogo class="max-tablet:mx-auto" />
					<div class="mt-12 font-montserrat text-[14px] text-[#6C6C6C]">
						<div>{{ config.current_address }}</div>
						<NuxtLink
							:to="'tel:' + config.current_phone_number"
							class="font-bold"
							>{{ config.current_phone_number }}</NuxtLink
						>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-[4rem] bg-[black] py-2 text-center text-[white]">
			<div class="font-montserrat text-[10px] opacity-50">
				&#169; {{ new Date().getFullYear() }} MLFM.STORE. Все права защищены
			</div>
		</div>
	</footer>
</template>
