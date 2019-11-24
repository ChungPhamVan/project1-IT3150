import ProductModel from '../models/productModel.js';
import CartModel from '../models/cartModel.js';
import fsExtra from 'fs-extra';
import _ from 'lodash'

let taoSanPhamMoi = (name, loai, giachinh, giaphu, anh) => {
  return new Promise(async(resolve, reject) => {
    try {
      let imageBuffer = await fsExtra.readFile(anh.path);
      let imageContentType = anh.mimetype;
      let imageName = anh.originalname;
      let newProductItem = {
        productname: name,
        price: giachinh,
        giaphu: giaphu,
        file: {
          data: imageBuffer, 
          contentType: imageContentType,
          fileName: imageName
        },
        loai: loai
      };
      let newProduct = await ProductModel.createNew(newProductItem);
      resolve(newProduct);
    } catch (error) {
      reject(error);
    }
  });
};
let updateSanPham = (id, name, loai, giachinh, giaphu, anh) => {
  return new Promise(async(resolve, reject) => {
    try {
      let imageBuffer = await fsExtra.readFile(anh.path);
      let imageContentType = anh.mimetype;
      let imageName = anh.originalname;
      let updateProductItem = {
        productname: name,
        price: giachinh,
        giaphu: giaphu,
        file: {
          data: imageBuffer, 
          contentType: imageContentType,
          fileName: imageName
        },
        loai: loai
      };
      let updateProduct = await ProductModel.updateProduct(id, updateProductItem);
      resolve(newProduct);
    } catch (error) {
      reject(error);
    }
  });
};
let getThongTinDanhSachSanPham = (danhSachIdVaAmountSanPham) => {
  return new Promise( async(resolve, reject) => {
    try {
      let getListProduct = danhSachIdVaAmountSanPham.map(async (productIdAndAmount) => {
        return {
          oneProduct: await ProductModel.timSanPham(productIdAndAmount.productId),
          amount: productIdAndAmount.amount
        }
      });
      resolve({
        listProducts: await Promise.all(getListProduct)
      });
    } catch (error) {
      reject(error);
    }
  });
};
let productsGeted = (kindProduct) => {
  return new Promise( async(resolve, reject) => {
    try {
      let products = await ProductModel.getProductTheoLoai(kindProduct);
      resolve(products);
    } catch (error) {
      reject(error)
    }
  });
}
let productById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await ProductModel.timSanPham(id);
      resolve(product);
    } catch (error) {
      reject(error);
    }
  });
}
let removeProduct = (productId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let remove = await ProductModel.deleteById(productId);
      resolve(remove);
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = {
  taoSanPhamMoi: taoSanPhamMoi,
  getThongTinDanhSachSanPham: getThongTinDanhSachSanPham,
  productsGeted: productsGeted,
  productById: productById,
  removeProduct: removeProduct,
  updateSanPham: updateSanPham
};