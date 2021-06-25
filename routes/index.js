const router = require('express').Router(); 

const pagesRouter = require('./pages'); 
const registerRouter = require('./auth/register');
const loginRouter = require('./auth/login');
const forgotPasswordRouter = require('./auth/forgot-password');
const resetPasswordRouter = require('./auth/reset-password');

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/forgot-password', forgotPasswordRouter);
router.use('/reset-password', resetPasswordRouter); 
router.get('*', pagesRouter);

module.exports = router;
