<template>
	<footer class="mt-auto border-t border-t-[#B4B4B4] pt-[4rem]">
		<div class="container">
			<div class="grid grid-cols-footer">
				<div>
					<div class="text-[1rem] font-bold">Информация</div>
					<ul class="mt-[30px] flex flex-col gap-3">
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink>О компании</NuxtLink>
						</li>
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink>Новости</NuxtLink>
						</li>
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink>Акции</NuxtLink>
						</li>
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink>Распродажа</NuxtLink>
						</li>
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink>Контакты</NuxtLink>
						</li>
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink>Адреса магазинов</NuxtLink>
						</li>
					</ul>
				</div>
				<div>
					<div class="text-[1rem] font-bold">Для покупателей</div>
					<ul class="mt-[30px] flex flex-col gap-3">
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink>Личный кабинет</NuxtLink>
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
						<li class="font-montserrat text-[14px] font-normal text-[#6C6C6C]">
							<NuxtLink>Часто задаваемые вопросы</NuxtLink>
						</li>
					</ul>
				</div>
				<div class="max-w-[430px]">
					<form @submit.prevent>
						<div class="text-[1rem] font-bold">У нас прекрасные новости</div>
						<p
							class="mt-[30px] font-montserrat text-[14px] font-normal text-[#6C6C6C]"
						>
							Лучшие акции, главные новинки и персональные предложения
						</p>
						<input type="email" name="email" placeholder="введите email" />
					</form>
				</div>
				<div>
					<IconsFooterLogo />
					<div class="mt-12 font-montserrat text-[14px] text-[#6C6C6C]">
						<div>Малая Бронная 24с3</div>
						<NuxtLink to="tel:+7(499)755-74-27" class="font-bold"
							>+7(499)755-74-27</NuxtLink
						>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-[4rem] bg-[black] py-2 text-center text-[white]">
			<div class="font-montserrat text-[10px] opacity-50">
				&#169; {{ new Date().getFullYear() }} MLFM.STORE. Все права защещены
			</div>
		</div>
	</footer>
</template>
