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
				g10: '#3F3F43',
				g9: '#66666E',
				g8: '#878793',
				g7: '#9E9EA9',
				g6: '#B3B3BC',
				g5: '#C4C4CD',
				g4: '#DBDBE0',
				g3: '#E8E8EB',
				g2: '#F0F0F3',
				g1: '#F8F8FA',
			},
			boxShadow: {
				blue: '1px 2px 24px rgba(97, 113, 255, 0.1)',
				gray: '1px 3px 24px rgba(178, 178, 188, 0.2)',
			},
		},
	},
	plugins: [],
};
