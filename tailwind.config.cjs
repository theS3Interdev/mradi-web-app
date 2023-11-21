/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			ubuntu: 'Ubuntu, sans-serif',
		},
		extend: {
			colors: {
				headingColor: '#444444',
				textColor: '#999999',
				primaryColor: '#8D69F1',
				highlightColor: '#D13267',
				backgroudColor: '#F4F4F4',
			},
		},
	},
	plugins: [],
};
