<template>
	<div
		class="absolute left-1/2 top-1/2 z-10 w-full max-w-[620px] translate-x-[-50%] translate-y-[-50%] px-4"
	>
		<div class="rounded-xl bg-white">
			<div class="relative">
				<NuxtImg class="rounded-xl" src="/img/about/1@2x.png" />

				<IconsClose
					class="absolute right-[1.875rem] top-[1.875rem] cursor-pointer text-[#1E1C1C]"
				/>
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
</template>
