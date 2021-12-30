const express = require('express');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

const {publicUserInfo} = require('../controllers/user-info');


router.get('/public/:userId', publicUserInfo);

module.exports = router;