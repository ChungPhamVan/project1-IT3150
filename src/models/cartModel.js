import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let CartModel = new Schema({
  user_id: String,
  productids: [
    {
      product_id: String,
      amount: { type: Number, default: 0 }
    }    
  ],
  totalprice: { type: String, default: 0 }
});
CartModel.statics = {

};

module.exports = mongoose.model("cart", CartModel);