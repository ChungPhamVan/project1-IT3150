import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let CartModel = new Schema({
  user_id: String,
  products: [
    {
      productId: String,
      amount: { type: Number, default: 0 }
    }    
  ],
  totalprice: { type: Number, default: 0 }
});
CartModel.statics = {
  createNew(item) {
    return this.create(item);
  },
  timCart(userId) {
    return this.findOne({
      "user_id": userId
    }).exec();
  },
  updateToCart(userId, danhsachSanPham, tongTienMoi) {
    return this.findOneAndUpdate(
      {"user_id": userId},
      {
        "products": danhsachSanPham,
        "totalprice": tongTienMoi
      }
    ).exec();
  },
  removeCart(userId) {
    return this.deleteOne({
      "user_id": userId
    }).exec();
  }
};

module.exports = mongoose.model("cart", CartModel);