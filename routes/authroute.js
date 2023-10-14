import express  from 'express'
const router = express.Router();
import checkUser  from '../middleware/checkUser.js'
import {signup_post,login_post,password_update,user_delete,user_logout,validity_update,login_reset} from './routehandler.js'

router.post('/user/create', signup_post);

router.post('/user/login', login_post);

router.post('/user/password/update', password_update);

router.post('/user/delete', user_delete);
router.get('/user/logout', checkUser,user_logout);
router.post('/user/validity/update', validity_update);
router.post('/login/reset/update', login_reset);










export default router


