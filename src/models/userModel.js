import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;
let UserSchema = new Schema({
  username: String,
  avatar: { type: String, default: "avatar-user-default.jpg" },
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
  timKiemTheoEmail(email) {
    return this.findOne({
      "local.email": email
    }).exec();
  }
};
UserSchema.method = {
  comparePassword(password) {
    return bcrypt.compare(password, this.local.password);
  }
};
module.exports = mongoose.model("user", UserSchema);