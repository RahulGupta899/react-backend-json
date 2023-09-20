const express = require('express')
const router = express.Router();
const {homePage,about} = require('../controllers/homeController')

router.route('/home').get(homePage)
router.route('/about').get(about)

module.exports = router;