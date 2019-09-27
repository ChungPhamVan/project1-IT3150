// import thư viện
import express from 'express';
// import các file
import { auth, home } from '../controllers/index.js';
import { authValid } from '../validation/index.js';
import passport from 'passport';
import initPassportLocal from '../controllers/passportController/local';
import initPassportFacebook from '../controllers/passportController/facebook';
import initPassportGoogle from '../controllers/passportController/google';

initPassportLocal(); // xác thực qua passport local
initPassportFacebook(); // xác thực qua passport facebook
initPassportGoogle(); // xác thực qua google 


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
  // đăng nhập qua facebook
  router.get('/auth/facebook', auth.kiemTraDangXuatChua,
    passport.authenticate("facebook", {
      scope: ["email"]
    })
  );
  router.get("/auth/facebook/callback", auth.kiemTraDangXuatChua,
    passport.authenticate("facebook", {
      successRedirect: "/", //nếu thành công thì đi đâu
      failureRedirect: "/login-register", // nếu thất bại thì đi đâu
    })
  );
  // đăng nhập qua google
  router.get('/auth/google', auth.kiemTraDangXuatChua,
    passport.authenticate("google", {
      scope: ["email"]
    })
  );
  router.get("/auth/google/callback", auth.kiemTraDangXuatChua,
    passport.authenticate("google", {
      successRedirect: "/", //nếu thành công thì đi đâu
      failureRedirect: "/login-register", // nếu thất bại thì đi đâu
    })
  );

  return app.use("/", router);
};
module.exports = initRoutes;