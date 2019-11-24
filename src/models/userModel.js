import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;
let UserSchema = new Schema({
  username: String,
  avatar: { type: String, default: "avatar-user-default.jpg" },
  isAdmin: { type: Boolean, default: false },
  isOwner: { type: Boolean, default: false },
  local: {
    email: { type: String, trim: true },
    password: String,
    isActive: { type: Boolean, default: false },
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  google: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  }
});
UserSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  timKiemTheoId(id) {
    return this.findById(id, {_id: 1, username: 1, avatar: 1, isAdmin: 1, isOwner: 1}).exec();
  },
  timKiemTheoEmail(email) {
    return this.findOne({
      "local.email": email
    }).exec();
  },
  xoaNguoiDung(id) {
    return this.findByIdAndRemove(id).exec();
  },
  timNguoiDungTheoToken(token) {
    return this.findOne({
      "local.verifyToken": token
    }).exec();
  },
  xacThucNguoiDungVaActive(token) {
    return this.findOneAndUpdate(
      { "local.verifyToken": token },
      { 
        "local.isActive": true,
        "local.verifyToken": null // xóa verifyToken khi click link xác thực
      }
    ).exec();
  },
  timKiemTheoFacebookId(uid) {
    return this.findOne({
      "facebook.uid": uid
    }).exec();
  },
  timKiemTheoGoogleId(uid) {
    return this.findOne({
      "google.uid": uid
    }).exec();
  },
  getListUsers() {
    return this.find()
               .select("_id username isAdmin isOwner")
               .exec();
  },
  updateToUser(id, isAdmin, isOwner) {
    return this.findOneAndUpdate(
      { "_id": id },
      {
        "isAdmin": isAdmin,
        "isOwner": isOwner
      }
    ).exec();
  },
  deleteById(id) {
    return this.deleteOne({
      "_id": id
    }).exec();
  }
};
UserSchema.methods = {
  sosanhPassword(password) {
    return bcrypt.compare(password, this.local.password);
  }
};
module.exports = mongoose.model("user", UserSchema);