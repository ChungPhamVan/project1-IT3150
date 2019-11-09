// import thư viện
import express from "express";
import multer from "multer";
// import các file
import { auth, home } from "../controllers/index.js";
import { authValid } from "../validation/index.js";
import passport from "passport";
import initPassportLocal from "../controllers/passportController/local";
import initPassportFacebook from "../controllers/passportController/facebook";
import initPassportGoogle from "../controllers/passportController/google";

initPassportLocal(); // xác thực qua passport local
initPassportFacebook(); // xác thực qua passport facebook
initPassportGoogle(); // xác thực qua google

let router = express.Router();
let upload = multer({ dest: "./public/images/upload" });
let initRoutes = app => {
  router.get("/", auth.kiemTraDangNhapChua, home.getHome); // vào trang chủ
  router.get(
    "/login-register",
    auth.kiemTraDangXuatChua,
    auth.getLoginRegister
  ); // vào trang đăng ký & đnag nhập
  router.post(
    "/register",
    auth.kiemTraDangXuatChua,
    authValid.register,
    auth.postRegister
  ); // ấn nút đăng ký
  router.get(
    "/xac_thuc_tai_khoan/:verifyToken",
    auth.kiemTraDangXuatChua,
    auth.xacThucTaiKhoan
  ); // link xác thực tài khoản
  router.post(
    "/login",
    auth.kiemTraDangXuatChua,
    passport.authenticate("local", {
      successRedirect: "/", //nếu thành công thì đi đâu
      failureRedirect: "/login-register", // nếu thất bại thì đi đâu
      successFlash: true, // bật để truyền req.flash về view
      failureFlash: true
    })
  );
  router.get("/logout", auth.kiemTraDangNhapChua, auth.getLogout);
  // đăng nhập qua facebook
  router.get(
    "/auth/facebook",
    auth.kiemTraDangXuatChua,
    passport.authenticate("facebook", {
      scope: ["email", "profile"]
    })
  );
  router.get(
    "/auth/facebook/callback",
    auth.kiemTraDangXuatChua,
    passport.authenticate("facebook", {
      successRedirect: "/", //nếu thành công thì đi đâu
      failureRedirect: "/login-register" // nếu thất bại thì đi đâu
    })
  );
  // đăng nhập qua google
  router.get(
    "/auth/google",
    auth.kiemTraDangXuatChua,
    passport.authenticate("google", {
      scope: ["email", "profile"]
    })
  );
  router.get(
    "/auth/google/callback",
    auth.kiemTraDangXuatChua,
    passport.authenticate("google", {
      successRedirect: "/", //nếu thành công thì đi đâu
      failureRedirect: "/login-register" // nếu thất bại thì đi đâu
    })
  );
  router.post("/add/product", auth.kiemTraDangNhapChua, home.addProduct);
  router.post("/remove/product", auth.kiemTraDangNhapChua, home.removeProduct);
  router.post(
    "/remove/kind/product",
    auth.kiemTraDangNhapChua,
    home.removeKindProduct
  );
  router.get("/update", auth.kiemTraDangNhapChua, home.update);
  router.post("/update", auth.kiemTraDangNhapChua, home.updatePost);
  router.get("/shopping-cart", auth.kiemTraDangNhapChua, home.showCart);
  router.get("/pay", auth.kiemTraDangNhapChua, home.pay);
  router.get(
    "/getproducts/:kindProduct",
    auth.kiemTraDangNhapChua,
    home.getProductsInHome
  );

  return app.use("/", router);
};
module.exports = initRoutes;
