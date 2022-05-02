const router = require("express").Router();
const authController = require('../controllers/auth.controllers');
const auth = require('../middleware/auth')

router.post('/signup', authController.signup);
router.post('/login', authController.login)
router.put('/:_id', auth, authController.update)

module.exports = router; 
