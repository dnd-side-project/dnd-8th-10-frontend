/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				w: '#FFFFFF',
				primary: '#5696FC',
				secondary: '#EC715B',
				transparent: { '80%': 'rgba(47, 47, 72, 0.8)', '20%': 'rgba(47, 47, 72, 0.2)' },
				cg4: '#2F2F48',
				cg3: '#505767',
				g9: '#66666E',
				g6: '#878787',
				g5: '#A8A8A8',
				cg2: '#A3A5AE',
				g41: '#D9D9D9',
				g42: '#DBDBE0',
				g3: '#E8E8E8',
				g2: '#F0F0F0',
				g1: '#F8F8F8',
				cg1: '#FAFBFF',
			},
			boxShadow: {
				blue: '1px 2px 24px rgba(97, 113, 255, 0.1)',
				gray: '1px 3px 24px rgba(178, 178, 188, 0.2)',
			},
		},
	},
	plugins: [],
};
