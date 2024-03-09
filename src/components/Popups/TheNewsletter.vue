<template>
	<div
		class="absolute left-1/2 top-1/2 z-10 w-full max-w-[620px] translate-x-[-50%] translate-y-[-50%] px-4"
	>
		<div class="rounded-xl bg-white">
			<div class="relative">
				<NuxtPicture class="rounded-xl" src="/img/about/1@2x.png" />

				<svg
					class="absolute right-[1.875rem] top-[1.875rem] cursor-pointer text-[#1E1C1C]"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L12 10.5858L22.2929 0.292893C22.6834 -0.0976311 23.3166 -0.0976311 23.7071 0.292893C24.0976 0.683417 24.0976 1.31658 23.7071 1.70711L13.4142 12L23.7071 22.2929C24.0976 22.6834 24.0976 23.3166 23.7071 23.7071C23.3166 24.0976 22.6834 24.0976 22.2929 23.7071L12 13.4142L1.70711 23.7071C1.31658 24.0976 0.683417 24.0976 0.292893 23.7071C-0.0976311 23.3166 -0.0976311 22.6834 0.292893 22.2929L10.5858 12L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
					/>
				</svg>
			</div>

			<div
				class="container flex max-w-[507px] flex-col pt-[34px] max-laptop:gap-[1.25rem] max-laptop:pb-[35px] laptop:gap-[2rem] laptop:pb-[4.375rem]"
			>
				<h3
					class="font-medium max-laptop:text-[0.875rem] laptop:text-[1.25rem]"
				>
					Присоединяйтесь к нам!
				</h3>

				<p class="max-laptop:text-[0.625rem] laptop:text-[0.875rem]">
					Получите доступ к закрытым акциям и первыми узнавайте о лимитированных
					коллекциях!
				</p>

				<div class="flex w-full max-laptop:h-[35px] laptop:h-[54px]">
					<input
						placeholder="EMAIL"
						class="w-full border-[1px] border-black text-[0.625rem] font-extralight max-tablet:px-[12px] tablet:px-[1.875rem]"
						type="text"
					/>

					<button
						class="w-full max-w-[150px] bg-black font-medium text-primary max-laptop:text-[12px] laptop:text-[0.875rem]"
					>
						Подписаться
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Оверлей -->
	<div
		class="overlayNewsletter absolute left-0 top-0 h-full w-full opacity-80"
	></div>
	<!-- /Оверлей -->
</template>
