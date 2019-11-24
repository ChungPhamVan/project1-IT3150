import userModel from '../models/userModel';

let getUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await userModel.getListUsers();
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
}
let plusAdmin = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let plus = await userModel.updateToUser(userId, true, false);
      resolve(plus);
    } catch (error) {
      reject(error);
    }
  });
}
let minusAdmin = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let minus = await userModel.updateToUser(userId, false, false);
      resolve(minus);
    } catch (error) {
      reject(error);
    }
  });
}
let removeUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let remove = await userModel.deleteById(userId);
      resolve(remove);
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = {
  getUsers: getUsers,
  plusAdmin: plusAdmin,
  minusAdmin: minusAdmin,
  removeUser: removeUser
}