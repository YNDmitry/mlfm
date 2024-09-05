export const useOtpTimer = (initialTimeout = 60) => {
	const otpResendTimeout = ref(initialTimeout)
	const {pause, resume} = useIntervalFn(() => {
		if (otpResendTimeout.value > 0) {
			otpResendTimeout.value--
		} else {
			pause()
		}
	}, 1000)

	return {
		otpResendTimeout,
		resume,
		pause,
	}
}
