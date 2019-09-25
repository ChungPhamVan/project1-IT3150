

let getHome = (req, res, next) => {
  res.render("main/master.ejs");
};
module.exports = {
  getHome: getHome
};