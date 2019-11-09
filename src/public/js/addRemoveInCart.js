$(document).ready(function() {
  $(".themmotsanpham")
    .unbind("click")
    .on("click", function() {
      // xử lý giao diện
      // thay đổi số lượng
      let soLuongHienTai = +$(this)
        .parent()
        .prev()
        .find("span")
        .text()
        .trim();
      let soLuongMoi = soLuongHienTai + 1;
      $(this)
        .parent()
        .prev()
        .find("span")
        .text(soLuongMoi);
      // thay đổi tổng tiền
      let tongTienHienTai = +$(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .next()
        .find(".sotongtien")
        .text()
        .trim()
        .slice(0, -1)
        .replace(".", "")
        .replace(".", "")
        .replace(".", "");
      let giasanpham = +$(this)
        .parent()
        .prev()
        .prev()
        .text()
        .trim()
        .slice(0, -1)
        .replace(".", "")
        .replace(".", "")
        .replace(".", "");

      let tongTienMoi = tongTienHienTai + giasanpham;
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .next()
        .find("span.sotongtien")
        .text(
          tongTienMoi.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") +
            " đ"
        );

      // xử lý database
      let product_id = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .data("uid")
        .trim();
      $.ajax({
        url: "/add/product",
        type: "post",
        data: {
          product_id: product_id
        },
        success: data => {
          if (data.success) {
            //owl carousel, slick slide
          }
        }
      });
    });

  $(".botmotsanpham")
    .unbind("click")
    .on("click", function() {
      // xử lý giao diện
      // thay đổi số lượng
      let soLuongHienTai = +$(this)
        .parent()
        .prev()
        .find("span")
        .text()
        .trim();
      // thay đổi tổng tiền
      let tongTienHienTai = +$(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .next()
        .find(".sotongtien")
        .text()
        .trim()
        .slice(0, -1)
        .replace(".", "")
        .replace(".", "")
        .replace(".", "");
      let giasanpham = +$(this)
        .parent()
        .prev()
        .prev()
        .text()
        .trim()
        .slice(0, -1)
        .replace(".", "")
        .replace(".", "")
        .replace(".", "");
      let tongTienMoi = tongTienHienTai - giasanpham;
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .next()
        .find("span.sotongtien")
        .text(
          tongTienMoi.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") +
            " đ"
        );
      let product_id = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .data("uid")
        .trim();
      if (soLuongHienTai > 1) {
        let soLuongMoi = soLuongHienTai - 1;
        $(this)
          .parent()
          .prev()
          .find("span")
          .text(soLuongMoi);
      } else {
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .remove();
      }
      // xử lý database
      $.ajax({
        url: "/remove/product",
        type: "post",
        data: {
          product_id: product_id
        },
        success: data => {
          if (data.success) {
          }
        }
      });
    });

  $(".xoamotloaisanpham")
    .unbind("click")
    .on("click", function() {
      let soLuongHienTai = +$(this)
        .parent()
        .prev()
        .find("span")
        .text()
        .trim();
      let tongTienHienTai = +$(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .next()
        .find(".sotongtien")
        .text()
        .trim()
        .slice(0, -1)
        .replace(".", "")
        .replace(".", "")
        .replace(".", "");
      let giasanpham = +$(this)
        .parent()
        .prev()
        .prev()
        .text()
        .trim()
        .slice(0, -1)
        .replace(".", "")
        .replace(".", "")
        .replace(".", "");
      let tongTienMoi = tongTienHienTai - giasanpham * soLuongHienTai;
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .next()
        .find("span.sotongtien")
        .text(
          tongTienMoi.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") +
            " đ"
        );
      let product_id = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .data("uid")
        .trim();
      $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .remove();
      // xử lý database
      $.ajax({
        url: "/remove/kind/product",
        type: "post",
        data: {
          product_id: product_id
        },
        success: data => {
          if (data.success) {
            //owl carousel, slick slide
          }
        }
      });
    });
});
