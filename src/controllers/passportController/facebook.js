import passport from 'passport';
import passportFacebook from 'passport-facebook'; // hỗ trợ đăng nhập trên facebook
import UserModel from '../../models/userModel';
import { transError, transSuccess } from '../../../lang/vi';
import dotenv from 'dotenv';
dotenv.config();

let facebookStrategy = passportFacebook.Strategy;

let fbId = process.env.FACEBOOK_ID;
let fbSecret = process.env.FACEBOOK_SECRET;
let fbCallbackUrl = process.env.FACEBOOK_CALLBACK_URL;

// kiểm tra tài khoản theo kiểu facebook
let initPassportFacebook = () => {
  passport.use(new facebookStrategy({
    clientID: fbId,
    clientSecret: fbSecret,
    callbackURL: fbCallbackUrl,
    passReqToCallback: true, // sau khi xác thực thì gửi callback bên dưới về server,
    profileFields: ["email", "displayName"] // những thông tin muốn lấy từ fb
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      let user = await UserModel.timKiemTheoFacebookId(profile.id);
      if(user) { // nếu người dùng đã từng đký rồi
        return done(null, user, req.flash("successArr_dangnhap", transSuccess.login_success));
      }
      console.log(profile);
      // nếu chưa đnhập lần nào bằng fb
      let newUserItem = {
        username: profile.displayName,
        local: {
          isActive: true // cái này có tài khoản fb rồi nên kh cần xác thực nữa
        },
        facebook: {
          uid: profile.id,
          token: accessToken,
          email: profile.emails[0].value // 1 fb có thể có nhiều email , nên chỉ lấy cái đầu
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
module.exports = initPassportFacebook;
