import passport from 'passport';
import passportLocal from 'passport-local'; // hỗ trợ đăng nhập trên local
import UserModel from '../../models/userModel';
import { transError, transSuccess } from '../../../lang/vi';

let localStrategy = passportLocal.Strategy;
// kiểm tra tài khoản theo kiểu local
let initPassportLocal = () => {
  passport.use(new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true // sau khi xác thực thì gửi callback bên dưới về server
  }, async (req, email, password, done) => {
    try {
      let user = await UserModel.timKiemTheoEmail(email);
      if (!user) { // nhâp sai email
        return done(null, false, req.flash("errorsArr_dangnhap", transError.sai_tai_khoan_mat_khau));
      }
      if(!user.local.isActive) { // Chưa kích hoạt tài khoản
        return done(null, false, req.flash("errorsArr_dangnhap", transError.email_not_active));
      }
      // kiểm tra mật khẩu
      let checkPassword = await user.sosanhPassword(password);
      if(!checkPassword) {
        return done(null, false, req.flash("errorsArr_dangnhap", transError.sai_tai_khoan_mat_khau));
      }
      // đúng hết
      return done(null, user, req.flash("successArr_dangnhap", transSuccess.login_success));
    } catch (error) {
      // lỗi server
      return done(null, false, req.flash("errorsArr_dangnhap", transError.loi_server));
    }
  }));
  // lưu user vào session
  passport.serializeUser( (user, done) => {
    done(null, user._id);
  });
  // nhận id từ session bên trên
  passport.deserializeUser( (id, done) => {
    UserModel.timKiemTheoId(id)
      .then(user => { 
        return done(null, user);
      })
      .catch( error => {
        return done(error, null);
      });
  });
};
module.exports = initPassportLocal;
