const { emptyDb } = require('./routes/pages');

const chai = require('chai');
const assert = chai.assert;

const app = require('./app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Unit Tests', () => {
	test('Register', (done) => {
		console.log('Running first test');
		chai
			.request(app)
			.post('/register')
			.send({
				email: 'test@test.com',
				password: 'qwerty',
			})
			.end((err, res) => {
				assert.equal(res.status, 200, 'The response should pass');
				done();
			});
	});

	// Create POST verify test
	// Create POST forgot password test
	// Create POST reset password test

	test('Login', (done) => {
		console.log('Running first test');
		chai
			.request(app)
			.post('/login')
			.send({
				email: 'test@test.com',
				password: 'qwerty',
			})
			.end((err, res) => {
				assert.equal(res.status, 200, 'The response should pass');
				done();
			});
	});
	// Logout test?
    
    // Function to clear database
    emptyDb()
});
