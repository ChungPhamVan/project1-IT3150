import passport from 'passport';
import passportGoogle from 'passport-google-oauth'; // hỗ trợ đăng nhập trên google
import UserModel from '../../models/userModel';
import { transError, transSuccess } from '../../../lang/vi';
import dotenv from 'dotenv';
dotenv.config();

let googleStrategy = passportGoogle.OAuth2Strategy;

let ggId = process.env.GOOGLE_ID;
let ggSecret = process.env.GOOGLE_SECRET;
let ggCallbackUrl = process.env.GOOGLE_CALLBACK_URL;

// kiểm tra tài khoản theo kiểu facebook
let initPassportGoogle = () => {
  passport.use(new googleStrategy({
    clientID: ggId,
    clientSecret: ggSecret,
    callbackURL: ggCallbackUrl,
    passReqToCallback: true, // sau khi xác thực thì gửi callback bên dưới về server
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      let user = await UserModel.timKiemTheoGoogleId(profile.id);
      if(user) { // nếu người dùng đã từng đký rồi
        return done(null, user, req.flash("successArr_dangnhap", transSuccess.login_success));
      }
      // nếu chưa đnhập lần nào bằng gg
      let newUserItem = {
        username: profile.displayName,
        local: {
          isActive: true // cái này có tài khoản gg rồi nên kh cần xác thực nữa
        },
        google: {
          uid: profile.id,
          token: accessToken,
          email: profile.emails[0].value // 1 gg có thể có nhiều email , nên chỉ lấy cái đầu
        }
      };
      let taoNguoiDungMoi = await UserModel.createNew(newUserItem);
      return done(null, taoNguoiDungMoi, req.flash("successArr_dangnhap", transSuccess.login_success));
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
module.exports = initPassportGoogle;
