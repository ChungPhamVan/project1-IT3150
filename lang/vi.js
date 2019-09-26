export const transValidation = {
  email_incorrect: "Email phải có dạng example@gmail.com",
  password_incorrect: "Mật khẩu có ít nhất 8 ký tự gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt",
  password_confirmation_incorrect: "Nhập lại mật khẩu chưa đúng"
};
export const transError = {
  email_used_by_user: "Email này đã được sử dụng",
  email_not_active: "Email này đã được đăng ký và chưa xác nhận, hãy vào email để xác nhận tài khoản",
  sai_tai_khoan_mat_khau: "Sai tài khoản hoặc mật khẩu",
  loi_server: "Lỗi máy chủ"
};
export const transSuccess = {
  dangky_thanhcong: (email) => {
    return `Tài khoản <strong>${email}</strong> đã được tạo, vui lòng truy cập email để xác thực`
  },
  login_success: "Đăng nhập thành công"
};
export const transMail = {
  subject: "Hãy click vào đường dẫn bên dưới để xác thực Email người dùng",
  template: (duong_dan_kich_hoat) => {
    return `
      <h2>Vui lòng click đường dẫn bên dưới đây</h2>
      <h3><a href="${duong_dan_kich_hoat}" target="_blank">${duong_dan_kich_hoat}</a></h3>
    `;
  },
  khong_the_gui_email_xac_nhan: "Quá trình gửi Email thất bại",
  xac_thuc_tai_khoan_thanh_cong: "Bạn hãy đăng nhập để truy cập trang web",
  da_kich_hoat_roi: "Tài khoản không tồn tại"
};