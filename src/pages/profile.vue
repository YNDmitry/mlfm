<template>
	<section class="pb-44 pt-20">
		<div class="container">
			<h1 class="text-h1">Мой профиль</h1>
			<div class="mt-20 flex items-start justify-between">
				<!-- Аватар -->
				<div
					class="flex h-64 w-64 items-center justify-center rounded-[100%] bg-red text-h1 text-primary"
				>
					EA
				</div>
				<!-- //Аватар -->

				<!-- Информация -->
				<div class="ml-20 mr-auto flex w-full max-w-[640px] flex-col gap-10">
					<div class="flex flex-col gap-5">
						<div class="flex gap-5">
							<label class="flex w-full cursor-pointer flex-col gap-2">
								<input
									class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
									type="text"
									placeholder="Имя"
									:value="'Екатерина'"
								/>
							</label>
							<label class="flex w-full cursor-pointer flex-col gap-2">
								<input
									class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
									type="text"
									placeholder="Имя"
									:value="'Антипова'"
								/>
							</label>
						</div>
						<label class="flex cursor-pointer flex-col gap-2">
							<input
								class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								type="email"
								placeholder="Email"
								:value="'KTR@gmail.com'"
							/>
						</label>
						<label class="flex cursor-pointer flex-col gap-2">
							<input
								class="w-full border-[1px] border-black font-light max-tablet:h-[1.875rem] max-tablet:rounded-[1.25rem] max-tablet:px-[12px] max-tablet:py-[5px] max-tablet:text-[0.625rem] tablet:h-[48px] tablet:rounded-[35px] tablet:px-[0.875rem] tablet:text-[0.875rem]"
								type="tel"
								placeholder="Phone"
								:value="'+7 999 999 99 99'"
							/>
						</label>
						<div class="flex justify-between">
							<NuxtLink class="text-[12px] font-normal underline"
								>Изменить пароль</NuxtLink
							>
							<NuxtLink class="text-[12px] font-normal underline"
								>Выйти</NuxtLink
							>
						</div>
						<label
							class="mt-5 flex cursor-pointer items-center gap-[0.625rem] pt-[12px]"
						>
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

							<span class="text-[0.625rem]"
								>Держите меня в курсе новостей и предложений</span
							>
						</label>
					</div>
				</div>
				<!-- Информация -->

				<button>
					<IconsEditProfile />
				</button>
			</div>
		</div>
	</section>
</template>
