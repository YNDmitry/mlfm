<template>
	<div>
		<section class="pt-[3.75rem]">
			<div class="container max-w-[1342px]">
				<div class="laptop:grid laptop:grid-cols-aside laptop:gap-20">
					<!-- Кнопки для фильтров (На Мобилках) -->
					<div
						class="items-center justify-between gap-4 pb-[2.5rem] pt-[70] max-laptop:flex laptop:hidden"
					>
						<button
							class="flex h-[3.125rem] w-full max-w-[250px] items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[28px]"
						>
							<svg
								class="text-[#3B3B3B]"
								xmlns="http://www.w3.org/2000/svg"
								width="10"
								height="10"
								viewBox="0 0 10 10"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M1.94036 5.40792L0.122039 7.32834C-0.0406796 7.5002 -0.0406796 7.77883 0.122039 7.95069L1.94036 9.87111C2.10307 10.043 2.36689 10.043 2.52961 9.87111C2.69233 9.69925 2.69233 9.42062 2.52961 9.24876L1.42259 8.07958H9.58333C9.81345 8.07958 10 7.88255 10 7.63951C10 7.39647 9.81345 7.19945 9.58333 7.19945H1.42259L2.52961 6.03026C2.69233 5.85841 2.69233 5.57977 2.52961 5.40792C2.36689 5.23606 2.10307 5.23606 1.94036 5.40792Z"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M8.05964 0.128892L9.87796 2.04931C10.0407 2.22117 10.0407 2.4998 9.87796 2.67166L8.05964 4.59208C7.89693 4.76394 7.63311 4.76394 7.47039 4.59208C7.30767 4.42023 7.30767 4.14159 7.47039 3.96974L8.57741 2.80055H0.416667C0.186548 2.80055 1.98682e-07 2.60353 1.98682e-07 2.36049C1.98682e-07 2.11745 0.186548 1.92042 0.416667 1.92042H8.57741L7.47039 0.751237C7.30767 0.579381 7.30767 0.300748 7.47039 0.128892C7.63311 -0.042964 7.89693 -0.042964 8.05964 0.128892Z"
								/>
							</svg>

							<span>Новое</span>
						</button>

						<button
							class="flex h-[3.125rem] w-full max-w-[250px] items-center justify-center gap-[0.625rem] rounded-[12px] border-[1px] border-black text-[0.625rem] max-mobile:h-[28px]"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="10"
								height="10"
								viewBox="0 0 10 10"
								fill="currentColor"
								class="text-[#3B3B3B]"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M5 9.16667C5.23012 9.16667 5.41667 8.98012 5.41667 8.75C5.41667 8.51988 5.23012 8.33333 5 8.33333C4.76988 8.33333 4.58333 8.51988 4.58333 8.75C4.58333 8.98012 4.76988 9.16667 5 9.16667ZM5 10C5.69036 10 6.25 9.44036 6.25 8.75C6.25 8.05964 5.69036 7.5 5 7.5C4.30964 7.5 3.75 8.05964 3.75 8.75C3.75 9.44036 4.30964 10 5 10Z"
								/>
								<path
									d="M0 8.75C0 8.51988 0.186548 8.33333 0.416667 8.33333H4.16667C4.39679 8.33333 4.58333 8.51988 4.58333 8.75C4.58333 8.98012 4.39678 9.16667 4.16667 9.16667H0.416667C0.186548 9.16667 0 8.98012 0 8.75Z"
								/>
								<path
									d="M5.41667 8.75C5.41667 8.51988 5.60321 8.33333 5.83333 8.33333H9.58333C9.81345 8.33333 10 8.51988 10 8.75C10 8.98012 9.81345 9.16667 9.58333 9.16667H5.83333C5.60321 9.16667 5.41667 8.98012 5.41667 8.75Z"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M7.08333 5.41667C7.31345 5.41667 7.5 5.23012 7.5 5C7.5 4.76988 7.31345 4.58333 7.08333 4.58333C6.85321 4.58333 6.66667 4.76988 6.66667 5C6.66667 5.23012 6.85321 5.41667 7.08333 5.41667ZM7.08333 6.25C7.77369 6.25 8.33333 5.69036 8.33333 5C8.33333 4.30964 7.77369 3.75 7.08333 3.75C6.39298 3.75 5.83333 4.30964 5.83333 5C5.83333 5.69036 6.39298 6.25 7.08333 6.25Z"
								/>
								<path
									d="M0 5C0 4.76988 0.186548 4.58333 0.416667 4.58333H6.25C6.48012 4.58333 6.66667 4.76988 6.66667 5C6.66667 5.23012 6.48012 5.41667 6.25 5.41667H0.416667C0.186548 5.41667 0 5.23012 0 5Z"
								/>
								<path
									d="M7.5 5C7.5 4.76988 7.68655 4.58333 7.91667 4.58333H9.58333C9.81345 4.58333 10 4.76988 10 5C10 5.23012 9.81345 5.41667 9.58333 5.41667H7.91667C7.68655 5.41667 7.5 5.23012 7.5 5Z"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M2.91667 1.66667C3.14679 1.66667 3.33333 1.48012 3.33333 1.25C3.33333 1.01988 3.14679 0.833333 2.91667 0.833333C2.68655 0.833333 2.5 1.01988 2.5 1.25C2.5 1.48012 2.68655 1.66667 2.91667 1.66667ZM2.91667 2.5C3.60702 2.5 4.16667 1.94036 4.16667 1.25C4.16667 0.559644 3.60702 0 2.91667 0C2.22631 0 1.66667 0.559644 1.66667 1.25C1.66667 1.94036 2.22631 2.5 2.91667 2.5Z"
								/>
								<path
									d="M0 1.25C0 1.01988 0.186548 0.833333 0.416667 0.833333H2.08333C2.31345 0.833333 2.5 1.01988 2.5 1.25C2.5 1.48012 2.31345 1.66667 2.08333 1.66667H0.416667C0.186548 1.66667 0 1.48012 0 1.25Z"
								/>
								<path
									d="M3.33333 1.25C3.33333 1.01988 3.51988 0.833333 3.75 0.833333H9.58333C9.81345 0.833333 10 1.01988 10 1.25C10 1.48012 9.81345 1.66667 9.58333 1.66667H3.75C3.51988 1.66667 3.33333 1.48012 3.33333 1.25Z"
								/>
							</svg>

							<span>Фильтры</span>
						</button>
					</div>
					<!-- Кнопки для фильтров (На Мобилках) -->

					<!-- Боковое меню (На ПК) -->
					<aside class="pb-[4.375rem] max-laptop:hidden">
						<div class="relative">
							<p
								class="relative mb-[1.875rem] pb-[35px] text-[12px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								1,688 Товаров
							</p>

							<!-- Чекбоксы -->
							<div
								class="relative pb-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
								data-lenis-prevent
							>
								<p class="pb-[1.25rem] text-[0.875rem]">Категория</p>

								<ScrollPanel style="width: 100%; height: 140px">
									<form class="flex flex-col gap-[0.625rem] text-[0.625rem]">
										<label
											class="flex cursor-pointer items-center gap-[0.625rem]"
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

											<span>Все продукты</span>
										</label>

										<label
											class="flex cursor-pointer items-center gap-[0.625rem]"
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

											<span>Брошь</span>
										</label>

										<label
											class="flex cursor-pointer items-center gap-[0.625rem]"
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

											<span>Подвески</span>
										</label>

										<label
											class="flex cursor-pointer items-center gap-[0.625rem]"
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

											<span>Серьги</span>
										</label>

										<label
											class="flex cursor-pointer items-center gap-[0.625rem]"
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

											<span>Кольца</span>
										</label>

										<label
											class="flex cursor-pointer items-center gap-[0.625rem]"
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

											<span>Кольца</span>
										</label>
									</form>
								</ScrollPanel>

								<div class="flex items-center gap-[5px] pt-[1.25rem]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 12 12"
										fill="currentColor"
									>
										<mask
											id="mask0_417_5299"
											style="mask-type: luminance"
											maskUnits="userSpaceOnUse"
											x="0"
											y="0"
											width="12"
											height="12"
										>
											<path
												d="M11.6602 0L11.6602 11.079L9.91821e-05 11.079L9.91821e-05 0L11.6602 0Z"
												fill="white"
											/>
										</mask>
										<g mask="url(#mask0_417_5299)">
											<path
												d="M6.50473 10.4589C6.65379 10.4345 6.79372 10.5319 6.81806 10.6779C6.84239 10.8209 6.74201 10.9578 6.59295 10.9821C6.43781 11.0064 6.28571 11.0247 6.1336 11.0369C5.97846 11.049 5.82636 11.0551 5.67122 11.0551C4.10458 11.0551 2.687 10.4376 1.66184 9.43676C0.636677 8.43897 0.0008955 7.06094 0.0008955 5.53385C0.0008955 4.0098 0.636677 2.63176 1.66184 1.63398C2.687 0.633155 4.10458 0.015625 5.67122 0.015625C7.23786 0.015625 8.65544 0.633155 9.6806 1.63398C10.7088 2.63176 11.3415 4.0098 11.3415 5.53385C11.3415 6.11791 11.2472 6.68373 11.0738 7.21608C10.9278 7.65413 10.7301 8.07089 10.4837 8.45418L11.3659 8.40247C11.5149 8.39334 11.6457 8.5059 11.6518 8.65192C11.661 8.79793 11.5484 8.92266 11.3963 8.93178L9.97567 9.01696C9.85095 9.02304 9.74144 8.95003 9.70189 8.84052L9.1087 7.44728C9.0509 7.31343 9.11782 7.15524 9.25776 7.10049C9.39465 7.04573 9.55587 7.10961 9.61063 7.2465L10.0122 8.18649C10.2403 7.83665 10.4229 7.4564 10.5537 7.05486C10.7118 6.57726 10.794 6.0662 10.794 5.53385C10.794 4.15885 10.2221 2.91163 9.29426 2.00815C8.36645 1.10467 7.08576 0.547978 5.67122 0.547978C4.25668 0.547978 2.97295 1.10467 2.04513 2.00815C1.12036 2.91163 0.545417 4.15885 0.545417 5.53385C0.545417 6.91188 1.12036 8.15911 2.04513 9.06259C2.97295 9.96303 4.25668 10.5228 5.67122 10.5228C5.81419 10.5228 5.95413 10.5167 6.08797 10.5045C6.23399 10.4954 6.37088 10.4771 6.50473 10.4558V10.4589Z"
												fill="black"
											/>
										</g>
									</svg>
									<button
										class="text-[8px] leading-[1.188rem] underline hover:no-underline"
									>
										Сбросить параметры
									</button>
								</div>
							</div>
							<!-- /Чекбоксы -->

							<!-- Коллекция -->
							<div
								class="relative flex flex-col gap-[1.25rem] pb-[0.625rem] pt-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								<span class="text-[0.875rem]">Коллекция</span>

								<select class="h-[1.25rem] cursor-pointer text-[0.625rem]">
									<option value="gold">Коллекция 1</option>
									<option value="silver">Коллекция 2</option>
								</select>
							</div>
							<!-- /Коллекция -->

							<!-- Цвет -->
							<div
								class="relative flex flex-col gap-[1.25rem] pb-[0.625rem] pt-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								<span class="text-[0.875rem]">Цвет</span>

								<select class="h-[1.25rem] cursor-pointer text-[0.625rem]">
									<option value="gold">Золотой</option>
									<option value="silver">Серебрянный</option>
								</select>
							</div>
							<!-- /Цвет -->

							<!-- Цена -->
							<div
								class="relative flex flex-col gap-[1.25rem] pb-[25px] pt-[25px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								<span class="text-[0.875rem]">Цена</span>

								<div
									class="flex justify-between gap-[0.625rem] text-[0.625rem]"
								>
									<label
										for="inp1"
										class="rounded-full flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-[2px] border"
									>
										<span
											class="pointer-events-none whitespace-nowrap text-nowrap"
											>От -
										</span>

										<input
											class="w-[72px] focus:outline-none"
											id="inp1"
											type="number"
											min="0"
											value="56.000"
										/>
									</label>

									<label
										for="inp2"
										class="rounded-full flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-[2px] border"
									>
										<span
											class="pointer-events-none whitespace-nowrap text-nowrap"
											>До -
										</span>

										<input
											class="w-[72px] focus:outline-none"
											id="inp2"
											type="number"
											min="0"
											value="100.000"
										/>
									</label>
								</div>
							</div>
							<!-- /Цена -->

							<!-- Dropdown-ы -->
							<div
								class="relative flex flex-col gap-[1.25rem] pb-[0.625rem] pt-[1.25rem] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray2 after:content-['']"
							>
								<span class="text-[0.875rem]">Бренд</span>

								<select class="h-[1.25rem] cursor-pointer text-[0.625rem]">
									<option value="gold">Золотой</option>
									<option value="silver">Серебрянный</option>
								</select>
							</div>
							<!-- /Dropdown-ы -->

							<div class="pt-[25px]">
								<NuxtPicture
									src="/img/catalog/2@2x.png"
									width="275"
									height="485"
									loading="lazy"
									decoding="auto"
								/>
							</div>
						</div>
					</aside>
					<!-- /Боковое меню (На ПК)-->

					<div class="max-laptop:pb-[3.75rem] laptop:pb-[4.375rem]">
						<!-- Хлебные крошки -->
						<div class="pb-[3.125rem] pt-[8px] text-[12px] max-laptop:hidden">
							<a href="javascript:void(0)">Главная</a>
							/
							<a href="javascript:void(0)">Каталог</a>
							/
							<a href="javascript:void(0)">Коллекция</a>
						</div>
						<!-- /Хлебные крошки -->

						<p
							class="mb-[3.75rem] rounded-[12px] border-[1px] border-gray p-[9px] text-[0.625rem] leading-[18px] max-laptop:hidden"
						>
							Проект My Little Flea Market (MLFM) появился в 2013 году. Начался
							он как страница для ближайших друзей и знакомых, где можно было
							найти замысловатые диковинки со всего мира вроде тюрбанов Dior,
							японских расчесок 1920-х, винтажных украшений. Они изготавливаются
							в лучших еврейских традициях и напоминают «сокровища». Позднее к
							проекту присоединились дизайнеры люкс-сегмента из Израиля.
							Участники и клиенты проекта — единомышленники, умеющие видеть
							красоту мира и разнообразие культур.
						</p>

						<!-- Раздел с карточками 1 -->
						<div class="grid grid-cols-catalog gap-[1.875rem] pb-[3.75rem]">
							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/1@2x.png"
										width="300"
										height="410"
										loading="lazy"
										decoding="auto"
									/>

									<svg
										class="absolute right-[0.5rem] top-[0.625rem]"
										width="18.430664"
										height="16.285156"
										viewBox="0 0 18.4307 16.2852"
										fill="none"
									>
										<path
											id="Vector 15"
											d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
											stroke="#222222"
											stroke-opacity="1.000000"
											stroke-width="1.000000"
										/>
									</svg>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>

							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/2@2x.png"
										width="300"
										height="410"
										loading="lazy"
										decoding="auto"
									/>

									<svg
										class="absolute right-[0.5rem] top-[0.625rem]"
										width="18.430664"
										height="16.285156"
										viewBox="0 0 18.4307 16.2852"
										fill="none"
									>
										<path
											id="Vector 15"
											d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
											stroke="#222222"
											stroke-opacity="1.000000"
											stroke-width="1.000000"
										/>
									</svg>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>

							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/3@2x.png"
										width="300"
										height="410"
										loading="lazy"
										decoding="auto"
									/>

									<svg
										class="absolute right-[0.5rem] top-[0.625rem]"
										width="18.430664"
										height="16.285156"
										viewBox="0 0 18.4307 16.2852"
										fill="none"
									>
										<path
											id="Vector 15"
											d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
											stroke="#222222"
											stroke-opacity="1.000000"
											stroke-width="1.000000"
										/>
									</svg>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>
						</div>
						<!-- /Раздел с карточками 1 -->

						<!-- Изображение -->
						<div
							class="overflow-hidden max-laptop:mx-[-16px] max-laptop:pb-[3.75rem] laptop:pb-[6.25rem]"
						>
							<NuxtPicture
								src="/img/catalog/1@2x.png"
								width="955"
								height="605"
								loading="lazy"
								decoding="auto"
							/>
						</div>
						<!-- /Изображение -->

						<!-- Раздел с карточками 2 -->
						<div
							class="max-mobile:grid-cols-2 grid grid-cols-catalog gap-[1.875rem] pb-[3.75rem]"
						>
							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/1@2x.png"
										width="300"
										heihgt="410"
										loading="lazy"
										decoding="auto"
									/>

									<svg
										class="absolute right-[0.5rem] top-[0.625rem]"
										width="18.430664"
										height="16.285156"
										viewBox="0 0 18.4307 16.2852"
										fill="none"
									>
										<path
											id="Vector 15"
											d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
											stroke="#222222"
											stroke-opacity="1.000000"
											stroke-width="1.000000"
										/>
									</svg>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>

							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/2@2x.png"
										width="300"
										heihgt="410"
										loading="lazy"
										decoding="auto"
									/>

									<svg
										class="absolute right-[0.5rem] top-[0.625rem]"
										width="18.430664"
										height="16.285156"
										viewBox="0 0 18.4307 16.2852"
										fill="none"
									>
										<path
											id="Vector 15"
											d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
											stroke="#222222"
											stroke-opacity="1.000000"
											stroke-width="1.000000"
										/>
									</svg>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>

							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/3@2x.png"
										width="300"
										heihgt="410"
										loading="lazy"
										decoding="auto"
									/>

									<button class="group">
										<svg
											class="group-hover:fill-current group-hover:stroke-current absolute right-[0.5rem] top-[0.625rem] group-hover:text-red2-hover"
											width="18.430664"
											height="16.285156"
											viewBox="0 0 18.4307 16.2852"
											fill="none"
										>
											<path
												class="group-hover:stroke-transparent"
												d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
												stroke="#222222"
												stroke-opacity="1.000000"
												stroke-width="1.000000"
											/>
										</svg>
									</button>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>
						</div>
						<!-- /Раздел с карточками 2 -->

						<!-- Раздел с карточками 3 -->
						<div
							class="max-mobile:grid-cols-2 grid grid-cols-catalog gap-[1.875rem] pb-[3.75rem]"
						>
							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/1@2x.png"
										width="300"
										heihgt="410"
										loading="lazy"
										decoding="auto"
									/>

									<button class="group">
										<svg
											class="group-hover:fill-current group-hover:stroke-current absolute right-[0.5rem] top-[0.625rem] group-hover:text-red2-hover"
											width="18.430664"
											height="16.285156"
											viewBox="0 0 18.4307 16.2852"
											fill="none"
										>
											<path
												class="group-hover:stroke-transparent"
												d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
												stroke="#222222"
												stroke-opacity="1.000000"
												stroke-width="1.000000"
											/>
										</svg>
									</button>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>

							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/2@2x.png"
										width="300"
										heihgt="410"
										loading="lazy"
										decoding="auto"
									/>

									<button class="group">
										<svg
											class="group-hover:fill-current group-hover:stroke-current absolute right-[0.5rem] top-[0.625rem] group-hover:text-red2-hover"
											width="18.430664"
											height="16.285156"
											viewBox="0 0 18.4307 16.2852"
											fill="none"
										>
											<path
												class="group-hover:stroke-transparent"
												d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
												stroke="#222222"
												stroke-opacity="1.000000"
												stroke-width="1.000000"
											/>
										</svg>
									</button>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>

							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/3@2x.png"
										width="300"
										heihgt="410"
										loading="lazy"
										decoding="auto"
									/>

									<button class="group">
										<svg
											class="group-hover:fill-current group-hover:stroke-current absolute right-[0.5rem] top-[0.625rem] group-hover:text-red2-hover"
											width="18.430664"
											height="16.285156"
											viewBox="0 0 18.4307 16.2852"
											fill="none"
										>
											<path
												class="group-hover:stroke-transparent"
												d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
												stroke="#222222"
												stroke-opacity="1.000000"
												stroke-width="1.000000"
											/>
										</svg>
									</button>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>
						</div>
						<!-- /Раздел с карточками 3 -->

						<div
							class="flex items-center justify-around max-laptop:justify-between max-laptop:gap-[2.5rem] max-tablet:pb-[85px] tablet:pb-[3.75rem] tablet:pt-[2.5rem]"
						>
							<div
								class="text-center text-red2 max-laptop:pl-[0.938rem] laptop:pl-[2.5rem]"
							>
								<NuxtPicture
									src="/img/catalog/3@2x.png"
									width="283"
									height="184"
									loading="lazy"
									decoding="auto"
								/>
							</div>

							<div>
								<NuxtPicture
									src="/img/choiceStylist/2@2x.png"
									width="332"
									height="409"
									loading="lazy"
									decoding="auto"
								/>
							</div>
						</div>

						<!-- Раздел с карточками 4 -->
						<div
							class="max-mobile:grid-cols-2 grid grid-cols-catalog gap-[1.875rem] pb-[3.75rem]"
						>
							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/1@2x.png"
										width="300"
										heihgt="410"
										loading="lazy"
										decoding="auto"
									/>

									<button class="group">
										<svg
											class="group-hover:fill-current group-hover:stroke-current absolute right-[0.5rem] top-[0.625rem] group-hover:text-red2-hover"
											width="18.430664"
											height="16.285156"
											viewBox="0 0 18.4307 16.2852"
											fill="none"
										>
											<path
												class="group-hover:stroke-transparent"
												d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
												stroke="#222222"
												stroke-opacity="1.000000"
												stroke-width="1.000000"
											/>
										</svg>
									</button>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>

							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/2@2x.png"
										width="300"
										heihgt="410"
										loading="lazy"
										decoding="auto"
									/>

									<button class="group">
										<svg
											class="group-hover:fill-current group-hover:stroke-current absolute right-[0.5rem] top-[0.625rem] group-hover:text-red2-hover"
											width="18.430664"
											height="16.285156"
											viewBox="0 0 18.4307 16.2852"
											fill="none"
										>
											<path
												class="group-hover:stroke-transparent"
												d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
												stroke="#222222"
												stroke-opacity="1.000000"
												stroke-width="1.000000"
											/>
										</svg>
									</button>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>

							<article>
								<div class="relative">
									<NuxtPicture
										class="w-full max-tablet:aspect-[136/165]"
										src="/img/newItems/3@2x.png"
										width="300"
										heihgt="410"
										loading="lazy"
										decoding="auto"
									/>

									<button class="group">
										<svg
											class="group-hover:fill-current group-hover:stroke-current absolute right-[0.5rem] top-[0.625rem] group-hover:text-red2-hover"
											width="18.430664"
											height="16.285156"
											viewBox="0 0 18.4307 16.2852"
											fill="none"
										>
											<path
												class="group-hover:stroke-transparent"
												d="M2.24023 9.50586C0.166016 7.55664 -0.0859375 4.34961 1.65918 2.10156C3.54492 -0.330078 7.33105 0.078125 8.65625 2.85547C8.84375 3.24805 9.40234 3.24805 9.58887 2.85547C10.9141 0.078125 14.7002 -0.330078 16.5869 2.10156L16.8828 2.48438C18.46 4.51562 18.2324 7.41406 16.3574 9.17578L9.80078 15.334L9.12988 15.7852L9.11523 15.7852L8.44531 15.334L2.24023 9.50586Z"
												stroke="#222222"
												stroke-opacity="1.000000"
												stroke-width="1.000000"
											/>
										</svg>
									</button>
								</div>

								<div
									class="flex flex-col gap-[0.5rem] pt-5 text-[0.875rem] font-medium max-tablet:pt-[0.25rem] max-tablet:text-[0.625rem]"
								>
									<p>Жакет Red</p>

									<span>32,000 ₽</span>
								</div>
							</article>
						</div>
						<!-- /Раздел с карточками 4 -->

						<!-- Пагинация -->
						<div
							class="relative flex w-full justify-between after:absolute after:left-0 after:top-[-8.5px] after:h-[2px] after:w-full after:bg-gray2 after:content-[''] max-laptop:mt-[3.75rem] tablet:px-[35px]"
						>
							<div class="flex gap-[12px]">
								<button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="25"
										height="25"
										viewBox="0 0 25 25"
										fill="none"
									>
										<g clip-path="url(#clip0_476_2655)">
											<path
												d="M14.062 7.13281L9.06201 12.1328L14.062 17.1328"
												stroke="#292929"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</g>
										<line
											x1="4.56201"
											y1="18.1328"
											x2="4.56201"
											y2="7.13281"
											stroke="#3C3C3C"
										/>
										<defs>
											<clipPath id="clip0_476_2655">
												<rect
													width="24"
													height="24"
													fill="white"
													transform="matrix(-1 0 0 -1 24.062 24.1328)"
												/>
											</clipPath>
										</defs>
									</svg>
								</button>

								<button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="25"
										height="25"
										viewBox="0 0 25 25"
										fill="none"
									>
										<g clip-path="url(#clip0_476_2658)">
											<path
												d="M14.062 7.13281L9.06201 12.1328L14.062 17.1328"
												stroke="#292929"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</g>
										<defs>
											<clipPath id="clip0_476_2658">
												<rect
													width="24"
													height="24"
													fill="white"
													transform="matrix(-1 0 0 -1 24.062 24.1328)"
												/>
											</clipPath>
										</defs>
									</svg>
								</button>
							</div>

							<div
								class="flex w-full items-center justify-between px-[25px] text-[8px] max-tablet:justify-center"
							>
								<button class="max-tablet:hidden">Назад</button>

								<div>
									<span class="max-tablet:hidden">Страница</span>

									<span>16</span>
									из
									<span>16</span>
								</div>

								<button class="max-tablet:hidden">Вперед</button>
							</div>

							<div class="flex gap-[12px]">
								<button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="25"
										height="25"
										viewBox="0 0 25 25"
										fill="none"
									>
										<g clip-path="url(#clip0_476_2650)">
											<path
												d="M10.084 17.5L15.084 12.5L10.084 7.5"
												stroke="#292929"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</g>
										<defs>
											<clipPath id="clip0_476_2650">
												<rect
													width="24"
													height="24"
													fill="white"
													transform="translate(0.0839844 0.5)"
												/>
											</clipPath>
										</defs>
									</svg>
								</button>

								<button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="25"
										height="25"
										viewBox="0 0 25 25"
										fill="none"
									>
										<g clip-path="url(#clip0_476_2651)">
											<path
												d="M10.084 17.5L15.084 12.5L10.084 7.5"
												stroke="#292929"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</g>
										<line
											x1="19.584"
											y1="6.5"
											x2="19.584"
											y2="17.5"
											stroke="#3C3C3C"
										/>
										<defs>
											<clipPath id="clip0_476_2651">
												<rect
													width="24"
													height="24"
													fill="white"
													transform="translate(0.0839844 0.5)"
												/>
											</clipPath>
										</defs>
									</svg>
								</button>
							</div>
						</div>
						<!-- /Пагинация -->
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
