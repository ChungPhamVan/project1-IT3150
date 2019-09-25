// import thư viện
import express from 'express';
// import các file
import { auth, home } from '../controllers/index.js';
import { authValid } from '../validation/index.js';




let router = express.Router();
let initRoutes = (app) => {
  router.get('/', home.getHome);// vào trang chủ
  router.get('/login-register', auth.getLoginRegister);// vào trang đăng ký & đnag nhập
  router.post('/register', authValid.register, auth.postRegister);// ấn nút đăng ký
  

  return app.use("/", router);
};
module.exports = initRoutes;