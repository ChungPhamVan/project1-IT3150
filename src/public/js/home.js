function bufferToBase64(buffer) {
  return btoa(
    new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
}

$(document).ready(function() {
  $(".icon-menu.click").click(function() {
    $(".nenden").removeClass("nendenxuathien");
    $(".khunghinhmenu").removeClass("khunghinhmenuxuathien");
  });
  $(".icon-menu.batra").click(function() {
    $(".nenden").addClass("nendenxuathien");
    $(".khunghinhmenu").addClass("khunghinhmenuxuathien");
  });
  $("ul li.dienthoai a")
    .unbind("click")
    .on("click", function(event) {
      event.preventDefault();
      $(".container .row.khungthaydoi").html(
        `<h1 class="w-100 text-center">Sản phẩm điện thoại di động</h1>
      <ul class="danhsachsanpham danhsachdienthoai row">`
      );
      $.get("/getproducts/dienthoai", function(data) {
        if (!data.length) {
          return false;
        }
        data.forEach(product => {
          $(".container .row.khungthaydoi")
            .find("ul")
            .append(
              `<li class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-5" data-uid="${
                product._id
              }">
            <div class="khung1sanpham">
              <div class="phananh">
                <img src="data:${
                  product.file.contentType
                }; base64, ${bufferToBase64(product.file.data.data)}" alt="">
              </div>
              <div class="phanchu text-center mt-4">
                <div class="ten">
                  ${product.productname}
                </div>
                <div class="giaca mt-3">
                  <span class="giachinh">${product.price
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                  <span class="giaphu">${product.giaphu
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                </div>
                <div class="nutmua mt-3">
                  <button type="button" class="btn btn-primary btn-outline-primary nutmuasanpham" data-uid="dt1">Chọn sản phẩm</button>
                </div>
              </div>
            </div>
          </li>`
            );
          addProduct();
        });
      });
    });

  $("ul li.maytinh a")
    .unbind("click")
    .on("click", function(event) {
      event.preventDefault();
      $(".container .row.khungthaydoi").html(
        `<h1 class="w-100 text-center">Sản phẩm máy tính xách tay</h1>
      <ul class="danhsachsanpham danhsachmaytinh row">`
      );
      $.get("/getproducts/maytinh", function(data) {
        if (!data.length) {
          return false;
        }
        data.forEach(product => {
          $(".container .row.khungthaydoi")
            .find("ul")
            .append(
              `<li class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-5" data-uid="${
                product._id
              }">
            <div class="khung1sanpham">
              <div class="phananh  position-relative">
                <img src="data:${
                  product.file.contentType
                }; base64, ${bufferToBase64(product.file.data.data)}" alt="">
                <div class="nenxanh position-absolute w-100 h-100 top-0"></div>
                <div class="thanh thanh1 position-absolute"></div>
                <div class="thanh thanh2 position-absolute"></div>
                <div class="sanphamchinhhang tren position-absolute">SẢN PHẨM</div>
                <div class="sanphamchinhhang duoi position-absolute">CHÍNH HÃNG</div>
              </div>
              <div class="phanchu text-center mt-4">
                <div class="ten">
                  ${product.productname}
                </div>
                <div class="giaca mt-3">
                  <span class="giachinh">${product.price
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                  <span class="giaphu">${product.giaphu
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                </div>
                <div class="nutmua mt-3">
                  <button type="button" class="btn btn-primary btn-outline-primary nutmuasanpham" data-uid="mt1">Chọn sản phẩm</button>
                </div>
              </div>
            </div>
          </li>`
            );
          addProduct();
        });
      });
    });

  $("ul li.tainghe a")
    .unbind("click")
    .on("click", function(event) {
      event.preventDefault();
      $(".container .row.khungthaydoi").html(
        `<h1 class="w-100 text-center">Sản phẩm tai nghe di động</h1>
      <ul class="danhsachsanpham danhsachtainghe row">`
      );
      $.get("/getproducts/tainghe", function(data) {
        if (!data.length) {
          return false;
        }
        data.forEach(product => {
          $(".container .row.khungthaydoi")
            .find("ul")
            .append(
              `<li class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-5" data-uid="${
                product._id
              }">
            <div class="khung1sanpham">
              <div class="phananh d-flex justify-content-center">
                <div class="d-inline-block position-relative">
                  <img src="data:${
                    product.file.contentType
                  }; base64, ${bufferToBase64(product.file.data.data)}" alt="">
                  <div class="nenxanh position-absolute"></div>
                  <div class="khungtrang position-absolute w-80 h-80">  </div>
                  <div class="sanphamchinhhang tren position-absolute">SẢN PHẨM</div>
                  <div class="sanphamchinhhang duoi position-absolute">CHÍNH HÃNG</div>
                </div>
              </div>
              <div class="phanchu text-center mt-4">
                <div class="ten">
                  ${product.productname}
                </div>
                <div class="giaca mt-3">
                  <span class="giachinh">${product.price
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                  <span class="giaphu">${product.giaphu
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>
                </div>
                <div class="nutmua mt-3">
                  <button type="button" class="btn btn-primary btn-outline-primary nutmuasanpham" data-uid="mt1">Chọn sản phẩm</button>
                </div>
              </div>
            </div>
          </li>`
            );
          addProduct();
        });
      });
    });
  addProduct();
});
