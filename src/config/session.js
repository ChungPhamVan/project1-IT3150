import session from 'express-session';// cấu hình session cho tài khoản
import connectMongo from 'connect-mongo'; // để lưu session vào mongodb

let MongoStore = connectMongo(session);
let sessionStore = new MongoStore({
  url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  autoReconnect: true,
  autoRemove: "native"// xóa session sau 2 ngày
});

let configSession = (app) => {
  app.use(session({
    key: "express.sid",
    secret: "mySecret",
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 48 // để session sống 2 ngày
    }
  }));
};
module.exports = configSession;