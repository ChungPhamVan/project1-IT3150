/**
 * import từ các thư viện npm
 */
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';// lấy req.body từ form
import connectFlash from 'connect-flash';// gửi thông báo lỗi trực tiếp validation về view

/**
 * import từ các file khác
 */
import initRoutes from './routes/web.js';
import connectDB from './config/connectDB.js';
import configViewEngine from './config/viewEngine.js';
import configSession from './config/session';



dotenv.config();// gọi biến môi trường trong file .env

let app = express();// khởi tạo biến app
let server = http.createServer(app);// tạo 1 server


connectDB();// hàm kết nối với mongodb
configSession(app);// phải để sau connectDB() và lưu session
configViewEngine(app);// gọi hàm view engine để hiển thị
app.use(bodyParser.urlencoded({ extended: true }));// lấy data từ form
app.use(connectFlash());// gửi trực tiếp thông báo lỗi validation về view
initRoutes(app);// hàm gọi các router trong file web

server.listen(process.env.APP_PORT, process.env.APP_HOST, function() {
  console.log('Server đã start với port: ' + process.env.APP_PORT);
});

