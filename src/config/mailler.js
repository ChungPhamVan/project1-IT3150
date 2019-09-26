import nodeMailer from 'nodemailer';// dùng để gửi mail xác nhận về người đk
import dotenv from 'dotenv';
dotenv.config();

let adminEmail = process.env.MAIL_USER;
let adminPassword = process.env.MAIL_PASSWORD;
let mailHost = process.env.MAIL_HOST;
let mailPort = process.env.MAIL_PORT;
/**
 * 
 * @param {đến đâu} to 
 * @param {chủ đề thư} subject 
 * @param {nội dung thư} htmlHontent 
 */
let sendEmail = (to, subject, htmlContent) => {
  let transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // cấu hình SSL_TLS(http-không bảo mật)
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  });
  let options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent
  };
  return transporter.sendMail(options);// gửi về 1 Promise
};
module.exports = sendEmail;