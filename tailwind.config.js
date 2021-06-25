module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundColor: (theme) => ({
				...theme('colors'),
				primary: '#131921',
				secondary: '#232f3e',
			}),
		},
	},
	variants: {
		extend: {
			outline: ['focus'],
		},
	},
	plugins: [],
};
