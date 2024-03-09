<template>
	<section class="pb-[95px] pt-[95px] max-tablet:pt-[2rem]">
		<div class="container max-w-[680px]">
			<h1
				class="leading-[110%] max-laptop:text-[48px] max-tablet:text-[1.25rem] max-mobile:pb-[2rem] mobile:pb-[24px] laptop:text-[55px]"
			>
				Свяжитесь с нами
			</h1>

			<h3 class="text-[1.25rem] max-tablet:text-[12px] max-mobile:text-[8px]">
				Наша дружная команда будет рада услышать вас.
			</h3>

			<div class="font-roboto flex flex-col gap-4 pt-[2rem]">
				<div
					class="flex items-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<svg
						class="text-black"
						xmlns="http://www.w3.org/2000/svg"
						width="21"
						height="17"
						viewBox="0 0 21 17"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M2.5 0.5H18.5C19.6046 0.5 20.5 1.39543 20.5 2.5V14.5C20.5 15.6046 19.6046 16.5 18.5 16.5H2.5C1.39543 16.5 0.5 15.6046 0.5 14.5V2.5C0.5 1.39543 1.39543 0.5 2.5 0.5ZM12.15 11.95L18.5 7.5V5.4L11.15 10.55C10.7591 10.8213 10.2409 10.8213 9.85 10.55L2.5 5.4V7.5L8.85 11.95C9.841 12.6427 11.159 12.6427 12.15 11.95Z"
						/>
					</svg>

					<a href="javascript:void(0)">hello@mlfm.store</a>
				</div>

				<div
					class="flex items-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<svg
						class="text-black"
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="currentColor"
					>
						<path
							d="M17.5 21.5018C15.8463 21.5003 14.2183 21.0916 12.76 20.3118L12.31 20.0618C9.20075 18.3901 6.65169 15.841 4.98 12.7318L4.73 12.2818C3.92982 10.8152 3.50713 9.17243 3.5 7.50173V6.83173C3.49958 6.29869 3.71196 5.78753 4.09 5.41173L5.78 3.72173C5.94413 3.55633 6.17581 3.47661 6.40696 3.50599C6.63811 3.53537 6.84248 3.67053 6.96 3.87173L9.21 7.73173C9.43753 8.12462 9.37183 8.62149 9.05 8.94173L7.16 10.8318C7.00304 10.987 6.96647 11.2268 7.07 11.4218L7.42 12.0818C8.67704 14.4102 10.5893 16.319 12.92 17.5718L13.58 17.9318C13.775 18.0353 14.0148 17.9987 14.17 17.8418L16.06 15.9518C16.3802 15.63 16.8771 15.5643 17.27 15.7918L21.13 18.0418C21.3312 18.1593 21.4664 18.3637 21.4957 18.5948C21.5251 18.826 21.4454 19.0577 21.28 19.2218L19.59 20.9118C19.2142 21.2898 18.703 21.5022 18.17 21.5018H17.5Z"
						/>
					</svg>

					<a href="javascript:void(0)">+7 (999) 999 99 99</a>
				</div>

				<div
					class="flex items-center gap-4 font-light max-tablet:text-[12px] max-mobile:text-[0.625rem]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="currentColor"
						class="text-black"
					>
						<path
							d="M12.5001 2.5C8.50613 2.5 5.25684 5.7493 5.25684 9.7432C5.25684 14.6998 11.7388 21.9763 12.0148 22.2836C12.274 22.5723 12.7266 22.5718 12.9854 22.2836C13.2613 21.9763 19.7433 14.6998 19.7433 9.7432C19.7432 5.7493 16.494 2.5 12.5001 2.5ZM12.5001 13.3875C10.4906 13.3875 8.85586 11.7527 8.85586 9.7432C8.85586 7.73375 10.4907 6.09898 12.5001 6.09898C14.5095 6.09898 16.1443 7.73379 16.1443 9.74324C16.1443 11.7527 14.5095 13.3875 12.5001 13.3875Z"
						/>
					</svg>

					<a href="javascript:void(0)"
						>Малая Бронная 24с3, 2 этаж, Москва, Россия</a
					>
				</div>
			</div>
		</div>

		<div
			id="map"
			class="mx-auto max-tablet:w-full max-tablet:pt-[1rem] max-mobile:h-[250px] mobile:h-[405px] tablet:w-[635px] tablet:pt-[35px]"
		>
			<NuxtImg
				src="/contact/map.jpg"
				width="635"
				height="405"
				loading="lazy"
				decoding="auto"
				class="h-full"
			/>
		</div>
	</section>
</template>
