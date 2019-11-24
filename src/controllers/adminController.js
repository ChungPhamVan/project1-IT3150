import { user } from "../service/index.js";

let getAdmin = (req, res, next) => {
  if(req.user.isAdmin) {
    res.render("main/admin/admin.ejs", {
      user: req.user
    });
  } else {
    res.redirect("/update");
  }
}
let showListUsers = async (req, res, next) => {
  try {
    let getUsers = await user.getUsers();
    return res.status(200).send(getUsers);
  } catch (error) {
    return res.status(500).send(error);
  }
}
let plusUser = async (req, res, next) => {
  try {
    let userId = req.query.userId;
    let plusUser = await user.plusAdmin(userId);
    return res.status(200).send(!!plusUser);
  } catch (error) {
    return res.status(500).send(error);
  }
}
let minusUser = async (req, res, next) => {
  try {
    let userId = req.query.userId;
    let minusUser = await user.minusAdmin(userId);
    return res.status(200).send(!!minusUser);
  } catch (error) {
    return res.status(500).send(error);
  }
}
let removeUser = async (req, res, next) => {
  try {
    let userId = req.query.userId;
    let removeUser = await user.removeUser(userId);
    return res.status(200).send(!!removeUser);
  } catch (error) {
    return res.status(500).send(error);
  }
}
module.exports = {
  getAdmin: getAdmin,
  plusUser: plusUser,
  minusUser: minusUser,
  removeUser: removeUser,
  showListUsers: showListUsers
}