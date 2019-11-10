import { cart, product } from "../service/index.js";
import { bufferToBase64 } from "../helper/product.js";
import ProductModel from "../models/productModel";
import multer from "multer";
import fsExtra from "fs-extra";

let userIdAll;
let addProduct = async (req, res, next) => {
  try {
    let product_id = req.body.product_id;
    let userId = req.user._id;
    let addOneProductToCart = await cart.addProductToCart(userId, product_id);
    let thongTinCart = await cart.getThongTinGioHang(userId);
    return res
      .status(200)
      .send({
        success: !!addOneProductToCart,
        amountProducts: thongTinCart !== null ? thongTinCart.products : null
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

let removeProduct = async (req, res, next) => {
  try {
    let product_id = req.body.product_id;
    let userId = req.user._id;
    let removeOneProductToCart = await cart.removeProductToCart(
      userId,
      product_id
    );
    return res.status(200).send({ success: !!removeOneProductToCart });
  } catch (error) {
    return res.status(500).send(error);
  }
};

let removeKindProduct = async (req, res, next) => {
  try {
    let product_id = req.body.product_id;
    let userId = req.user._id;
    let removeKindProductToCart = await cart.removeKindProductToCart(
      userId,
      product_id
    );
    return res.status(200).send({ success: !!removeKindProductToCart });
  } catch (error) {
    return res.status(500).send(error);
  }
};

let showCart = async (req, res, next) => {
  let userId = req.user._id;
  let thongTinCacSanPham = {};
  let tongtien = 0;
  let thongTinCart = await cart.getThongTinGioHang(userId);
  if (thongTinCart !== null) {
    let danhSachIdVaAmountSanPham = thongTinCart.products;
    thongTinCacSanPham = await product.getThongTinDanhSachSanPham(
      danhSachIdVaAmountSanPham
    );
    tongtien = thongTinCart.totalprice;
  }
  res.render("main/showCart.ejs", {
    user: req.user,
    listProducts: thongTinCacSanPham.listProducts,
    tongtien: tongtien
  });
};

let getHome = async (req, res, next) => {
  let products = await ProductModel.getProductTheoLoai("dienthoai");
  let userId = req.user._id;
  userIdAll = req.user._id;
  let thongTinCart = await cart.getThongTinGioHang(userId);
  res.render("main/master.ejs", {
    user: req.user, // user đã được gửi qua session trong file passport.js rồi,
    products: products,
    amountProducts: thongTinCart !== null ? thongTinCart.products : null,
    bufferToBase64: bufferToBase64
  });
};
let update = async (req, res, next) => {
  let userId = req.user._id;
  let thongTinCart = await cart.getThongTinGioHang(userId);
  res.render("main/update.ejs", {
    user: req.user,
    amountProducts: thongTinCart !== null ? thongTinCart.products : null
  });
};

let storageImageChat = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/public/images/upload");
  },
  filename: (req, file, callback) => {
    let math = ["image/png", "image/jpg", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      return callback("Sai roi", null);
    }
    let imageName = `${file.originalname}`;
    callback(null, imageName);
  }
});
let imageMessageUploadFile = multer({
  storage: storageImageChat,
  limits: { fieldNameSize: 1048576 }
}).single("anh");

let updatePost = async (req, res, next) => {
  imageMessageUploadFile(req, res, async error => {
    if (error) {
      if (error.message) {
        return res.status(500).send("Lai sai roi");
      }
      return res.status(500).send(error);
    }

    try {
      let name = req.body.name;
      let loai = req.body.loai;
      let giachinh = req.body.giachinh;
      let giaphu = req.body.giaphu;
      let anh = req.file;

      let sanPhamMoi = await product.taoSanPhamMoi(
        name,
        loai,
        giachinh,
        giaphu,
        anh
      );

      await fsExtra.remove(
        `src/public/images/upload/${sanPhamMoi.file.fileName}`
      );
      return res.status(200).send({ message: newMessage });
    } catch (error) {
      return res.status(500).send(error);
    }
  });
};

let pay = (req, res, next) => {
  res.render("main/pay.ejs", {
    user: req.user // user đã được gửi qua session trong file passport.js rồi,
  });
};

let getProductsInHome = async (req, res, next) => {
  try {
    let kindProduct = req.params.kindProduct;
    let productsGeted = await product.productsGeted(kindProduct);
    return res.status(200).send(productsGeted);
  } catch (error) {
    return res.status(500).send(error);
  }
};
module.exports = {
  getHome: getHome,
  addProduct: addProduct,
  showCart: showCart,
  removeProduct: removeProduct,
  update: update,
  updatePost: updatePost,
  removeKindProduct: removeKindProduct,
  pay: pay,
  getProductsInHome: getProductsInHome
};
