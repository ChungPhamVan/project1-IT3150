import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';// dùng để băm mật khẩu
import uuidv4 from 'uuid/v4'; // dùng uuid version 4 để tạo 1 chuỗi ngẫu nhiên
import { transError, transSuccess } from '../../lang/vi';

let saltRounds = 7;// muối có 7 ký tự


let register = (email, password) => {
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
    resolve(transSuccess.dangky_thanhcong(email));// gửi thông báo thành công về controller
  });
};
module.exports = {
  register: register
};