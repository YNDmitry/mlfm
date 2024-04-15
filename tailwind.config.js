/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/components/**/*.{js,ts,vue}',
		'./src/pages/**/*.{js,ts,vue}',
		'./src/layouts/**/*.{js,ts,vue}',
		'./src/assets/css/**/*.css',
	],
	theme: {
		colors: {
			primary: '#ffffff',
			third: '#F4EAC8',
			gray: '#c5c5c5',
			gray2: '#B1B1B1',
			grayLight: '#E5EAED',
			darkGray: '#565656',
			darkGray2: '#505050',
			red2: '#A42D2A',
			red: '#CD3836',
			"red2-hover": "#c71010",
			black: '#000000'
		},
		gridTemplateColumns: {
			newItems: "repeat(4, 1fr)",
			buyImage: "1.35fr 0.55fr",
			buyImageMobile: "1fr",
			catalogItem: "1fr auto",
			catalog: "repeat(3, 1fr)",
			aside: "275px 1fr",
			delivery: "49% 51%",
			footer: '1fr 1fr auto auto',
			giftCart: "618px 1fr",
		},
		container: {
			center: true,
			padding: '1rem',
			screens: {
				mobile: '1340px',
				tablet: '1340px',
				laptop: '1340px',
			},
		},
		borderRadius: {
			main: '2.125rem',
		},
		fontSize: {
			h1: '1.5rem',
			h1Mob: '1.2rem',
			h2: '1rem',
			h2Mob: '0.8rem'
		},
		fontFamily: {
			main: ['Unbounded'],
			montserrat: ['Montserrat'],
		},
		screens: {
			mobile: '460px',
			tablet: '768px',
			laptop: '1024px',
		},
		plugins: [require('@tailwindcss/typography')({
			className: 'wysiwyg'
		}),]
	},
}
