import express from 'express';
import expressEjsExtend from 'express-ejs-extend';// dùng để kế nối, kế thừa các màn hình mà không phải viết lại

/**
 * cấu hình view engine cho app
 */
let configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.engine("ejs", expressEjsExtend);
  app.set("viewe engine", "ejs");
  app.set("views", "./src/views");// tự động đi vào thư mục view
};
module.exports = configViewEngine;
