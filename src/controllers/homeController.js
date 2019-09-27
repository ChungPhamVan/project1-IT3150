

let getHome = (req, res, next) => {
  res.render("main/master.ejs", {
    user: req.user // user đã được gửi qua session trong file passport.js rồi
  });
};
module.exports = {
  getHome: getHome
};