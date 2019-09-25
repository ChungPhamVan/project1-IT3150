import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ProductModel = new Schema({
  productname: String,
  description: String,
  image: String,
  price: Number
});
ProductModel.statics = {
  createNew(item) {
    return this.create(item);
  }
};
module.exports = mongoose.model("product", ProductModel);