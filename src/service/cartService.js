import cartModel from '../models/cartModel';
import productModel from '../models/productModel';

let addProductToCart = (userId, product_id) => {
  return new Promise( async (resolve, reject) => {
    let findProduct = await productModel.timSanPham(product_id);
    let cart = await cartModel.timCart(userId); // tìm xem người đó đã từng mua chưa
    if(!cart) {
      let newCart = { // tạo 1 giỏ mới
        user_id: userId,
        products: [
          {
            productId: product_id,
            amount: 1
          }    
        ],
        totalprice: findProduct.price
      };
      await cartModel.createNew(newCart);
      resolve(true);
    } else {
      // người đó có trong cart rồi
      // xem danh sách sản phẩm
      let danhsachSanPham = cart.products;
      let kiemTraTonTaiSanPham = false;
      let vitriTonTaiSanPham = 0;
      let soLuongSanPham = 0;
      danhsachSanPham.forEach( (product, index) => { // kiểm tra và tìm vị trí loại đó có trong giỏ của người mua không
        if(String(product.productId) === product_id) {
          kiemTraTonTaiSanPham = true;
          vitriTonTaiSanPham = index;
          soLuongSanPham = product.amount;
        }
      });
      if(!kiemTraTonTaiSanPham) {
        danhsachSanPham.push({ // thêm 1 loại vào giỏ
          productId: product_id,
          amount: 1
        });
      } else {  // đã mua sản phẩm rồi
        let sanphamMoi = {
          productId: product_id,
          amount: soLuongSanPham + 1
        };
        danhsachSanPham.splice(vitriTonTaiSanPham, 1, sanphamMoi);// thay element trùng bằng element mới
      }
      // điều chỉnh xong thì update
      let tongTienMoi = cart.totalprice + findProduct.price;
      let updateCart = await cartModel.updateToCart(userId, danhsachSanPham, tongTienMoi);
      if(!updateCart) {
        reject(false);
      }
    }
    resolve(true);
  });
};

let removeProductToCart = (userId, product_id) => {
  return new Promise( async (resolve, reject) => {
    let findProduct = await productModel.timSanPham(product_id);
    let cart = await cartModel.timCart(userId); // tìm xem người đó đã từng mua chưa
    if(!cart) {
      reject(false);
    }
    let danhsachSanPham = cart.products;
    let kiemTraTonTaiSanPham = false;
    let vitriTonTaiSanPham = 0;
    let soLuongSanPham = 0;
    danhsachSanPham.forEach( (product, index) => { // kiểm tra và tìm vị trí loại đó có trong giỏ của người mua không
      if(String(product.productId) === product_id) {
        kiemTraTonTaiSanPham = true;
        vitriTonTaiSanPham = index;
        soLuongSanPham = product.amount;
      }
    });
    if(!kiemTraTonTaiSanPham) {
      reject(false);
    } else {
      if(soLuongSanPham === 1) {
        if(danhsachSanPham.length === 1) {
          await cartModel.removeCart(userId);
          resolve(true);
        }
        danhsachSanPham.splice(vitriTonTaiSanPham, 1);
      } else if (soLuongSanPham > 1) {
        let sanphamMoi = {
          productId: product_id,
          amount: soLuongSanPham - 1
        };
        danhsachSanPham.splice(vitriTonTaiSanPham, 1, sanphamMoi);// thay element trùng bằng element mới
      }
      // điều chỉnh xong thì update
      let tongTienMoi = cart.totalprice - findProduct.price;
      let updateCart = await cartModel.updateToCart(userId, danhsachSanPham, tongTienMoi);
      if(!updateCart) {
        return reject(false);
      }
      resolve(true);
    }
  });
};

let removeKindProductToCart = (userId, product_id) => {
  return new Promise(async(resolve, reject) => {
    let findProduct = await productModel.timSanPham(product_id);
    let cart = await cartModel.timCart(userId); // tìm xem người đó đã từng mua chưa
    if(!cart) {
      reject(false);
    } else {
      let danhsachSanPham = cart.products;
      let kiemTraTonTaiSanPham = false;
      let vitriTonTaiSanPham = 0;
      let soLuongSanPham = 0;
      danhsachSanPham.forEach((product, index) => {
        if(String(product.productId) === product_id) {
          kiemTraTonTaiSanPham = true;
          vitriTonTaiSanPham = index;
          soLuongSanPham = product.amount;
        }
      });
      if(!kiemTraTonTaiSanPham) {
        reject(false);
      } else {
        if(danhsachSanPham.length === 1) {
          await cartModel.removeCart(userId);
          resolve(true);
        }
        danhsachSanPham.splice(vitriTonTaiSanPham, 1);
        // điều chỉnh xong thì update
        let tongTienMoi = cart.totalprice - findProduct.price * soLuongSanPham;
        let updateCart = await cartModel.updateToCart(userId, danhsachSanPham, tongTienMoi);
        if(!updateCart) {
          return reject(false);
        }
        resolve(true);
      }
    }
  });
}

let getThongTinGioHang = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await cartModel.timCart(userId));
    } catch (error) {
      reject(err);
    }
  })
}
module.exports = {
  addProductToCart: addProductToCart,
  removeProductToCart: removeProductToCart,
  getThongTinGioHang: getThongTinGioHang,
  removeKindProductToCart: removeKindProductToCart
};