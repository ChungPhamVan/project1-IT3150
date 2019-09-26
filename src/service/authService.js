import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';// dùng để băm mật khẩu
import uuidv4 from 'uuid/v4'; // dùng uuid version 4 để tạo 1 chuỗi ngẫu nhiên
import { transError, transSuccess, transMail } from '../../lang/vi';
import sendMail from '../config/mailler.js';

let saltRounds = 7;// muối có 7 ký tự


let register = (email, password, kieu_http, ten_host) => {
  // hàm controller đang đợi nên phải dùng Promise
  return new Promise(async (resolve, reject) => {
    // tìm xem email đã được dùng chưa
    let userTimKiemTheoEmail = await UserModel.timKiemTheoEmail(email);
    if(userTimKiemTheoEmail) {
      if(!userTimKiemTheoEmail.local.isActive) {// trường hợp đk rồi nhưng chưa active
        return reject(transError.email_not_active);
      }
      return reject(transError.email_used_by_user);// gửi lỗi về controller
    }
    // nếu chưa ai dùng thì lưu
    let salt = bcrypt.genSaltSync(saltRounds); // tạo muối có 7 ký tự
    let userItem = {
      username: email.split("@")[0],// tách mail thành mảng 2 phần ngăn bởi @, lấy phần tử đầu
      local: {
        email: email,
        password: bcrypt.hashSync(password, salt),// băm mật khẩu ra muối
        verifyToken: uuidv4()
      }
    };

    let user = await UserModel.createNew(userItem);// lưu vào database
    //gửi email về người dùng
    let duong_dan_kich_hoat = `${kieu_http}://${ten_host}/xac_thuc_tai_khoan/${userItem.local.verifyToken}`;// mã xác thực lấy từ verifyToken ngẫu nhiên
    sendMail(email, transMail.subject, transMail.template(duong_dan_kich_hoat))
      .then( succes => {
        resolve(transSuccess.dangky_thanhcong(email));// gửi thông báo thành công về controller
      })
      .catch( async (error) => {
        // xóa user do đã lưu và database rồi
        await UserModel.xoaNguoiDung(user._id);
        reject(transMail.khong_the_gui_email_xac_nhan);
      });
    
  });
};

let xacThucTaiKhoan = (verifyToken) => {
  return new Promise( async (resolve, reject) => {
    // tìm người dùng theo Token và xem người đó còn verifyToken hay là null
    let nguoiDungTheoToken = await UserModel.timNguoiDungTheoToken(verifyToken);
    if(!nguoiDungTheoToken) { // link kích hoạt đã được click rồi
      reject(transMail.da_kich_hoat_roi);
    }
    await UserModel.xacThucNguoiDungVaActive(verifyToken);
    resolve(transMail.xac_thuc_tai_khoan_thanh_cong);
  });
};
module.exports = {
  register: register,
  xacThucTaiKhoan: xacThucTaiKhoan
};