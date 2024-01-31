const router = require('express').Router();
const userApi = require('./user.api');
const authApi = require('./auth.api');

router.use('/api/user', userApi);
router.use('/api/auth', authApi);

module.exports = router;