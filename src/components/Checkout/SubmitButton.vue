<template>
	<div class="mt-[1.875rem] max-laptop:hidden">
		<button
			class="w-full bg-red2 text-primary transition-colors hover:bg-red2-hover max-tablet:min-h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:text-[0.625rem] tablet:min-h-[45px] tablet:rounded-[1.875rem]"
		>
			Оплатить заказ
		</button>
		<label
			id="check-2"
			class="gray flex cursor-pointer items-center gap-[0.625rem] pt-[0.938rem]"
		>
			<input
				id="check-2"
				type="checkbox"
				class="absolute h-5 w-5 cursor-pointer opacity-0"
			/>
			<div
				class="flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-grayLight"
			>
				<IconsCheck />
			</div>
			<p class="border-darkGray2 text-[0.625rem]">
				Я согласен со всеми
				<NuxtLink class="underline">правилами и условиями</NuxtLink>
			</p>
		</label>
		<label class="flex cursor-pointer items-center gap-[0.625rem] pt-[12px]">
			<input
				type="checkbox"
				class="absolute h-5 w-5 cursor-pointer opacity-0"
			/>
			<div
				class="flex h-5 w-5 cursor-pointer items-center justify-center border-[1px] border-grayLight"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="9"
					height="8"
					viewBox="0 0 9 8"
					fill="none"
				>
					<path
						d="M6.97016 0.968522C7.11103 0.834411 7.29848 0.760269 7.49298 0.76174C7.68747 0.763212 7.87378 0.840182 8.0126 0.976409C8.15143 1.11264 8.2319 1.29747 8.23704 1.4919C8.24218 1.68633 8.17159 1.87515 8.04016 2.01852L4.05016 7.00852C3.98155 7.08242 3.89874 7.14172 3.80669 7.18289C3.71464 7.22405 3.61523 7.24623 3.51441 7.2481C3.41359 7.24997 3.31343 7.23148 3.21991 7.19375C3.1264 7.15603 3.04146 7.09983 2.97016 7.02852L0.324158 4.38252C0.250471 4.31386 0.191369 4.23106 0.150377 4.13906C0.109385 4.04706 0.0873427 3.94775 0.0855659 3.84704C0.0837892 3.74634 0.102314 3.64631 0.140035 3.55292C0.177756 3.45954 0.233901 3.3747 0.305119 3.30348C0.376338 3.23226 0.461172 3.17612 0.55456 3.1384C0.647948 3.10068 0.747977 3.08215 0.84868 3.08393C0.949383 3.08571 1.0487 3.10775 1.1407 3.14874C1.2327 3.18973 1.3155 3.24883 1.38416 3.32252L3.47816 5.41552L6.95116 0.990522L6.97016 0.968522Z"
						fill="white"
					/>
				</svg>
			</div>
			<span class="text-[0.625rem]">Стать постоянным покупателем</span>
		</label>
	</div>
</template>
