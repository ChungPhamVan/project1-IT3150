function addProduct() {
  $(".nutmuasanpham")
    .unbind("click")
    .on("click", function() {
      let product_id = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .data("uid")
        .trim(); // lấy id sản phẩm
      let productName = $(this)
        .parent()
        .prev()
        .prev()
        .text()
        .trim(); // lấy tên sản phẩm

      Swal.fire({
        title: "Thêm thành công",
        type: "success",
        text: `${productName} đã được thêm vào giỏ hàng`,
        showCancelButton: false,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        width: "50rem",
        allowOutsideClick: true
      }).then(result => {});
      $.post("/add/product", {
        product_id: product_id
      }).done(data => {
        if (data.success) {
          let temp = $("span.badge.badge-primary");
          if (!temp.length) {
            $("li a .pe-7s-mail.fa.fa-shopping-cart").after(
              `<span class="badge badge-primary">${data.amountProducts.length}</span>`
            );
            return false;
          }
          $("span.badge.badge-primary").html(data.amountProducts.length);
        }
      });
    });
}
