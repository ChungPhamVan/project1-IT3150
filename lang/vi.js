export const transValidation = {
  email_incorrect: "Email phải có dạng example@gmail.com",
  password_incorrect: "Mật khẩu có ít nhất 8 ký tự gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt",
  password_confirmation_incorrect: "Nhập lại mật khẩu chưa đúng"
};
export const transError = {
  email_used_by_user: "Email này đã được sử dụng",
  email_not_active: "Email này đã được đăng ký và chưa xác nhận, hãy vào email để xác nhận tài khoản"
};
export const transSuccess = {
  dangky_thanhcong: (email) => {
    return `Tài khoản <strong>${email}</strong> đã được tạo, vui lòng truy cập email để xác thực`
  }
};