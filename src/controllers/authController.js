import { validationResult } from 'express-validator/check';// lấy kết quả sau khi đi qua validation 
import { auth } from '../service/index.js';

let getLoginRegister = (req, res, next) => {
  res.render("auth/master.ejs", {
    errorsArr: req.flash("errorsArr"),// trường hợp redirect về lại nó khi phát sinh lỗi validation,
    successArr: req.flash("successArr")// trường hợp redirect và gửi data thành công
  });
};

let postRegister = async (req, res, next) => {
  let errorsArr = [];
  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()) {// xem có thông báo lỗi không
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((error) => {
      errorsArr.push(error.msg);
    });
    req.flash("errorsArr", errorsArr); // gửi về cho view
    return res.redirect('/login-register');// nếu có lỗi thì quay lại trang login-register
  }
  //Nếu dữ liệu đúng thì tiếp tục xử lý trong service
  let email = req.body.email;
  let password = req.body.password;
  try {// bắt resolve từ service
    let thongbao_thanhcong = await auth.register(email, password);// hàm phải đợi để service xử lý xong
    req.flash("successArr", thongbao_thanhcong);
    return res.redirect('/login-register');
  } catch (error) {// bắt reject từ service
    errorsArr.push(error);
    req.flash("errorsArr", errorsArr);
    return res.redirect('/login-register');
  }
  

};
module.exports = {
  getLoginRegister: getLoginRegister,
  postRegister: postRegister
};