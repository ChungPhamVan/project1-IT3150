import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ProductModel = new Schema({
  productname: String,
  price: Number,
  giaphu: Number,
  file: {
    data: Buffer, 
    contentType: String,
    fileName: String
  },
  loai: String
});
ProductModel.statics = {
  createNew(item) {
    return this.create(item);
  },
  getProductTheoLoai(loai) {
    return this.find({
      "loai": loai
    }).exec();
  },
  timSanPham(id) {
    return this.findById(id).exec();
  }
};
module.exports = mongoose.model("product", ProductModel);