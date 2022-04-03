const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.user( '/users', userRoutes);
//  This will not work if you separate it out - build from parameter router.user( '/users/:userId/friends', friendRoutes);

module.exports = router;