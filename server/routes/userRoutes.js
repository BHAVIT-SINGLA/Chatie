const authController=require('../controllers/userController.js')
const router=require("express").Router();
router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/setavatar/:id',authController.setAvatar)

module.exports =router;