import { cart, product } from "../service/index.js";
import { bufferToBase64 } from "../helper/product.js";

let showProduct = async (req, res, next) => {
  let productId = req.params.id;
  let getProduct = await product.productById(productId);
  let userId = req.user ? req.user._id: null;
  let thongTinCart = null;
  if(userId) {
    thongTinCart = await cart.getThongTinGioHang(userId);
  }
  res.render("main/product.ejs", {
    user: req.user ? req.user : null, // user đã được gửi qua session trong file passport.js rồi
    product: getProduct,
    amountProducts: thongTinCart !== null ? thongTinCart.products : null,
    bufferToBase64: bufferToBase64
  });
}
let removeProduct = async (req, res, next) => {
  try {
    let productId = req.query.productId;
    let removeProduct = await product.removeProduct(productId);
    return res.status(200).send(!!removeProduct);
  } catch (error) {
    return res.status(500).send(error);
  }
}
module.exports = {
  showProduct: showProduct,
  removeProduct: removeProduct
};