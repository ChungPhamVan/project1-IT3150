// import thư viện
import express from 'express';
// import các file
import { auth, home } from '../controllers/index.js';
import { authValid } from '../validation/index.js';
import passport from 'passport';
import initPassportLocal from '../controllers/passportController/local';
import initPassportFacebook from '../controllers/passportController/facebook';

initPassportLocal(); // xác thực qua passport local
initPassportFacebook(); // xác thực qua passport facebook


let router = express.Router();
let initRoutes = (app) => {
  router.get('/', auth.kiemTraDangNhapChua, home.getHome);// vào trang chủ
  router.get('/login-register', auth.kiemTraDangXuatChua, auth.getLoginRegister);// vào trang đăng ký & đnag nhập
  router.post('/register', auth.kiemTraDangXuatChua, authValid.register, auth.postRegister);// ấn nút đăng ký
  router.get('/xac_thuc_tai_khoan/:verifyToken', auth.kiemTraDangXuatChua, auth.xacThucTaiKhoan); // link xác thực tài khoản
  router.post('/login', auth.kiemTraDangXuatChua,
    passport.authenticate("local", {
      successRedirect: "/", //nếu thành công thì đi đâu
      failureRedirect: "/login-register", // nếu thất bại thì đi đâu
      successFlash: true, // bật để truyền req.flash về view
      failureFlash: true
    }
  ));
  router.get('/logout', auth.kiemTraDangNhapChua, auth.getLogout);
  router.get('/auth/facebook',
    passport.authenticate("facebook", {
      scope: ["email"]
    })
  );
  router.get("/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/", //nếu thành công thì đi đâu
      failureRedirect: "/login-register", // nếu thất bại thì đi đâu
    })
  );

  return app.use("/", router);
};
module.exports = initRoutes;