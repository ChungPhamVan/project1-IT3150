import { validationResult } from 'express-validator/check';// lấy kết quả sau khi đi qua validation 
import { auth } from '../service/index.js';
import { transLogout } from '../../lang/vi';

let getLoginRegister = (req, res, next) => {
  res.render("auth/master.ejs", {
    errorsArr: req.flash("errorsArr"),// trường hợp redirect về lại nó khi phát sinh lỗi validation khi đk,
    successArr: req.flash("successArr"),// trường hợp redirect và gửi data thành công khi đk
    errorsArr_dangnhap: req.flash("errorsArr_dangnhap"), // redirect lại khi đăng nhập
    success_dangxuat: req.flash("success_dangxuat")// redirect khi đăng xuất
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
  let kieu_http = req.protocol; // mặc định là có sẵn rồi
  let ten_host = req.get("host");
  try {// bắt resolve từ service
    let thongbao_thanhcong = await auth.register(email, password, kieu_http, ten_host);// hàm phải đợi để service xử lý xong
    req.flash("successArr", thongbao_thanhcong);
    return res.redirect('/login-register');
  } catch (error) {// bắt reject từ service
    errorsArr.push(error);
    req.flash("errorsArr", errorsArr);
    return res.redirect('/login-register');
  }
  

};

let xacThucTaiKhoan = async (req, res, next) => {
  let errorsArr = [];
  try {
    let xacThucThanhCong = await auth.xacThucTaiKhoan(req.params.verifyToken);
    req.flash("successArr", xacThucThanhCong);
    res.redirect('/login-register');
  } catch (error) {
    errorsArr.push(error);
    req.flash("errorsArr", errorsArr);
    res.redirect('/login-register');
  }
};

let getLogout = (req, res, next) => {
  req.logout();// xóa passport của user trong session
  req.flash("success_dangxuat", transLogout.dang_xuat_thanh_cong);
  res.redirect("/login-register");
};

let kiemTraDangNhapChua = (req, res, next) => {
  if(!req.isAuthenticated()) { // kiểm tra đăng nhập chưa
    return res.redirect('/login-register');
  }
  next();// nếu rồi thì đi tiếp
};

let kiemTraDangXuatChua = (req, res, next) => {
  if(req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

module.exports = {
  getLoginRegister: getLoginRegister,
  postRegister: postRegister,
  xacThucTaiKhoan: xacThucTaiKhoan,
  getLogout: getLogout,
  kiemTraDangNhapChua: kiemTraDangNhapChua,
  kiemTraDangXuatChua: kiemTraDangXuatChua
};