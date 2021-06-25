const unMaskBtn = document.getElementById('unmask');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const form = document.querySelector('form');

const errors = document.querySelectorAll('.error');

const toggleShowPassword = () => {
	passwordEl.type = passwordEl.type === 'password' ? 'text' : 'password';
};

if (unMaskBtn) {
	unMaskBtn.addEventListener('click', toggleShowPassword);
}

errors.forEach((error) =>
	error.addEventListener('focus', (e) => {
		if (error.className.includes('error')) {
			error.nextSibling.remove()
			error.className = error.className.replace('error', '');
			
		}
	})
);
