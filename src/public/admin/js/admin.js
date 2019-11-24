function bufferToBase64(buffer) {
  return btoa(
    new Uint8Array(buffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
}
$(document).ready(function () {
  let userIsOwner = $(".userIsOwner").text() === 'true';
  $("a.user.plusUser").unbind("click").on("click", function (event) {
    $(".noidungbang").html("<h2 class='w-100 text-center'>Cấp quyền quản trị</h2>");
    event.preventDefault(); 
    if(userIsOwner) {
      $.get("/showlistuser", function(data) {
        let list = data.filter(user => !user.isAdmin);
        if(list.length) {
          $(".noidungbang").append(`
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Thực hiện tác vụ</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          `);
          list.forEach((user, index) => {
            $(".noidungbang tbody").append(`
              <tr id="userId" data-uid="${user._id}">
                <th scope="row">${index + 1}</th>
                <td>${user.username}</td>
                <td>
                  <button type="button" class="btn btn-primary btn-sm plusAdmin">Cấp quyền quản trị cho người này</button>
                </td>
              </tr>
            `);
            taskAdmin();
          });
        } else {
          $(".noidungbang").append("<h3 class='w-100 text-center'>Danh sách trống</h3>");
        }
      });
    } else {
      $(".noidungbang").append("<h3 class='w-100 text-center'>Tính năng chỉ dành cho người sở hữu trang web</h3>");
    }
    
  });
  $("a.user.minusUser").unbind("click").on("click", function (event) {
    event.preventDefault(); 
    $(".noidungbang").html("<h2 class='w-100 text-center'>Bỏ quyền quản trị</h2>");
    if(userIsOwner) {
      $.get("/showlistuser", function(data) {
        let list = data.filter(user => user.isAdmin && !user.isOwner);
        if(list.length) {
          $(".noidungbang").append(`
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Thực hiện tác vụ</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          `);
          list.forEach((user, index) => {
            $(".noidungbang tbody").append(`
              <tr id="userId" data-uid="${user._id}">
                <th scope="row">${index + 1}</th>
                <td>${user.username}</td>
                <td>
                  <button type="button" class="btn btn-warning btn-sm minusAdmin">Gỡ quyền quản trị của người này</button>
                </td>
              </tr>
            `);
            taskAdmin();
          });
        } else {
          $(".noidungbang").append("<h3 class='w-100 text-center'>Danh sách trống</h3>");
        }
      });
    } else {
      $(".noidungbang").append("<h3 class='w-100 text-center'>Tính năng chỉ dành cho người sở hữu trang web</h3>");
    }
    
  });
  $("a.user.removeUser").unbind("click").on("click", function (event) {
    event.preventDefault(); 
    $(".noidungbang").html("<h2 class='w-100 text-center'>Xóa người dùng khỏi hệ thống</h2>");
    if(userIsOwner) {
      $.get("/showlistuser", function(data) {
        let list = data.filter(user => !user.isOwner);
        if(list.length) {
          $(".noidungbang").append(`
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">Thực hiện tác vụ</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          `);
          list.forEach((user, index) => {
            $(".noidungbang tbody").append(`
              <tr id="userId" data-uid="${user._id}">
                <th scope="row">${index + 1}</th>
                <td>${user.username}</td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm removeUser">Xóa người dùng khỏi hệ thống</button>
                </td>
              </tr>
            `);
            taskAdmin();
          });
        } else {
          $(".noidungbang").append("<h3 class='w-100 text-center'>Danh sách trống</h3>");
        }
      });
    } else {
      $(".noidungbang").append("<h3 class='w-100 text-center'>Tính năng chỉ dành cho người sở hữu trang web</h3>");
    }
    
  });
  $("a.removeProduct#dienthoai").unbind("click").on("click", function(event) {
    event.preventDefault();
    $(".noidungbang").html("<h2 class='w-100 text-center'>Xóa sản phẩm là điện thoại</h2>");
    $.get(`/getproducts/dienthoai`, function(data) {
      if(data.length) {
        $(".noidungbang").append(`
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        `);
        data.forEach((product, index) => {
          $(".noidungbang tbody").append(`
            <tr id="productId" data-uid="${product._id}">
              <th scope="row">${index + 1}</th>
              <td style="max-width: 200px; width: 200px;">
                <img src="data:${
                  product.file.contentType
                  }; base64, ${bufferToBase64(product.file.data.data)}" alt=""
                  style="width: 100%;"  
                >
              </td>
              <td>${product.productname}</td>
              <td>${product.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              </td>
              <td>
                <button type="button" class="btn btn-danger btn-sm removeProduct">Xóa sản phẩm này khỏi hệ thống</button>
              </td>
            </tr>
          `);
          taskAdmin();
        });
      } else {
        $(".noidungbang").append("<h3 class='w-100 text-center'>Danh sách trống</h3>");
      }
    });
  });
  
  $("a.removeProduct#maytinh").unbind("click").on("click", function(event) {
    event.preventDefault();
    $(".noidungbang").html("<h2 class='w-100 text-center'>Xóa sản phẩm là máy tính</h2>");
    $.get(`/getproducts/maytinh`, function(data) {
      if(data.length) {
        $(".noidungbang").append(`
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        `);
        data.forEach((product, index) => {
          $(".noidungbang tbody").append(`
            <tr id="productId" data-uid="${product._id}">
              <th scope="row">${index + 1}</th>
              <td style="max-width: 200px; width: 200px;">
                <img src="data:${
                  product.file.contentType
                  }; base64, ${bufferToBase64(product.file.data.data)}" alt=""
                  style="width: 100%;"  
                >
              </td>
              <td>${product.productname}</td>
              <td>${product.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              </td>
              <td>
                <button type="button" class="btn btn-danger btn-sm removeProduct">Xóa sản phẩm này khỏi hệ thống</button>
              </td>
            </tr>
          `);
          taskAdmin();
        });
      } else {
        $(".noidungbang").append("<h3 class='w-100 text-center'>Danh sách trống</h3>");
      }
    });
  });

  $("a.removeProduct#tainghe").unbind("click").on("click", function(event) {
    event.preventDefault();
    $(".noidungbang").html("<h2 class='w-100 text-center'>Xóa sản phẩm là tai nghe</h2>");
    $.get(`/getproducts/tainghe`, function(data) {
      if(data.length) {
        $(".noidungbang").append(`
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        `);
        data.forEach((product, index) => {
          $(".noidungbang tbody").append(`
            <tr id="productId" data-uid="${product._id}">
              <th scope="row">${index + 1}</th>
              <td style="max-width: 200px; width: 200px;">
                <img src="data:${
                  product.file.contentType
                  }; base64, ${bufferToBase64(product.file.data.data)}" alt=""
                  style="width: 100%;"  
                >
              </td>
              <td>${product.productname}</td>
              <td>${product.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              </td>
              <td>
                <button type="button" class="btn btn-danger btn-sm removeProduct">Xóa sản phẩm này khỏi hệ thống</button>
              </td>
            </tr>
          `);
          taskAdmin();
        });
      } else {
        $(".noidungbang").append("<h3 class='w-100 text-center'>Danh sách trống</h3>");
      }
    });
  });

  $("a.addProduct#dienthoai").unbind("click").on("click", function(event) {
    event.preventDefault();
    $(".noidungbang").html("<h2 class='w-100 text-center'>Thêm sản phẩm là điện thoại</h2>");
    $(".noidungbang").append(`
      <div class="main">
        <div class="container tim-container" style="max-width: 800px; padding-top: 50px;">
          <div class="row col-12">
            <div class="form-group">
              <label for="name">Tên sản phẩm</label>
              <input type="text" placeholder="product's name" class="form-control" id="name">
            </div>
            <div class="form-group">
              <label for="loai">Loại sản phẩm (viết liền không dấu)</label>
              <input type="text" placeholder="product's kind" class="form-control loai" id="loai" disabled value="dienthoai">
            </div>
            <div class="form-group">
              <label for="giachinh">Giá chính</label>
              <input type="text" placeholder="product's main price" class="form-control giachinh" id="giachinh">
            </div>
            <div class="form-group">
              <label for="giaphu">Giá phụ</label>
              <input type="text" placeholder="product's secondary price" class="form-control giaphu" id="giaphu">
            </div>
            <div class="form-group">
              <label for="anh">Ảnh sản phẩm</label>
              <input type="file" placeholder="product's image file" class="form-control anh" id="anh">
            </div>
            <div class="w-100 d-flex justify-content-center mb-5">
              <button class="w-100 btn btn-primary gui btn-lg" id="gui" style="width: 100%; border-radius: 5px;">Gửi</button>
            </div>
          </div>
        </div>
      </div> 
    `);
    addProduct();
  });

  $("a.addProduct#maytinh").unbind("click").on("click", function(event) {
    event.preventDefault();
    $(".noidungbang").html("<h2 class='w-100 text-center'>Thêm sản phẩm là máy tính</h2>");
    $(".noidungbang").append(`
      <div class="main">
        <div class="container tim-container" style="max-width: 800px; padding-top: 50px;">
          <div class="row col-12">
            <div class="form-group">
              <label for="name">Tên sản phẩm</label>
              <input type="text" placeholder="product's name" class="form-control" id="name">
            </div>
            <div class="form-group">
              <label for="loai">Loại sản phẩm (viết liền không dấu)</label>
              <input type="text" placeholder="product's kind" class="form-control loai" id="loai" disabled value="maytinh">
            </div>
            <div class="form-group">
              <label for="giachinh">Giá chính</label>
              <input type="text" placeholder="product's main price" class="form-control giachinh" id="giachinh">
            </div>
            <div class="form-group">
              <label for="giaphu">Giá phụ</label>
              <input type="text" placeholder="product's secondary price" class="form-control giaphu" id="giaphu">
            </div>
            <div class="form-group">
              <label for="anh">Ảnh sản phẩm</label>
              <input type="file" placeholder="product's image file" class="form-control anh" id="anh">
            </div>
            <div class="w-100 d-flex justify-content-center mb-5">
              <button class="w-100 btn btn-primary gui btn-lg" id="gui" style="width: 100%; border-radius: 5px;">Gửi</button>
            </div>
          </div>
        </div>
      </div> 
    `);
    addProduct();
  });

  $("a.addProduct#tainghe").unbind("click").on("click", function(event) {
    event.preventDefault();
    $(".noidungbang").html("<h2 class='w-100 text-center'>Thêm sản phẩm là tai nghe di động</h2>");
    $(".noidungbang").append(`
      <div class="main">
        <div class="container tim-container" style="max-width: 800px; padding-top: 50px;">
          <div class="row col-12">
            <div class="form-group">
              <label for="name">Tên sản phẩm</label>
              <input type="text" placeholder="product's name" class="form-control" id="name">
            </div>
            <div class="form-group">
              <label for="loai">Loại sản phẩm (viết liền không dấu)</label>
              <input type="text" placeholder="product's kind" class="form-control loai" id="loai" disabled value="tainghe">
            </div>
            <div class="form-group">
              <label for="giachinh">Giá chính</label>
              <input type="text" placeholder="product's main price" class="form-control giachinh" id="giachinh">
            </div>
            <div class="form-group">
              <label for="giaphu">Giá phụ</label>
              <input type="text" placeholder="product's secondary price" class="form-control giaphu" id="giaphu">
            </div>
            <div class="form-group">
              <label for="anh">Ảnh sản phẩm</label>
              <input type="file" placeholder="product's image file" class="form-control anh" id="anh">
            </div>
            <div class="w-100 d-flex justify-content-center mb-5">
              <button class="w-100 btn btn-primary gui btn-lg" id="gui" style="width: 100%; border-radius: 5px;">Gửi</button>
            </div>
          </div>
        </div>
      </div> 
    `);
    addProduct();
  });

  $("a.fixProduct#dienthoai").unbind("click").on("click", function(event) {
    event.preventDefault();
    $(".noidungbang").html("<h2 class='w-100 text-center'>Sửa sản phẩm là điện thoại</h2>");
    $.get(`/getproducts/dienthoai`, function(data) {
      if(data.length) {
        $(".noidungbang").append(`
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        `);
        data.forEach((product, index) => {
          $(".noidungbang tbody").append(`
            <tr id="productId" data-uid="${product._id}">
              <th scope="row">${index + 1}</th>
              <td style="max-width: 200px; width: 200px;">
                <img src="data:${
                  product.file.contentType
                  }; base64, ${bufferToBase64(product.file.data.data)}" alt=""
                  style="width: 100%;"  
                >
              </td>
              <td>${product.productname}</td>
              <td>${product.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              </td>
              <td>
                <button
                  type="button" class="btn btn-primary btn-sm" style="border-radius: 3px;"
                  data-toggle="modal" 
                  data-target="#${product._id}"
                >
                  Sửa
                </button>
              </td>
            </tr>
          `);
          $(".noidungbang").append(`
            <div class="modal fade" id="${product._id}" tabindex="-1" role="dialog" aria-labelledby="${product._id}Title" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" style="border-radius: 5px; overflow: hidden;">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle" style="display: inline-block;">Chỉnh sửa sản phẩm ${product.productname}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="main">
                      <div class="container tim-container" style="width: 100%; padding-top: 0px;">
                        <div class="row col-12">
                          <div class="form-group">
                            <label for="name">Tên sản phẩm</label>
                            <input type="text" placeholder="product's name" class="form-control" id="name" value="${product.productname}">
                          </div>
                          <div class="form-group">
                            <label for="loai">Loại sản phẩm (viết liền không dấu)</label>
                            <input type="text" placeholder="product's kind" class="form-control loai" id="loai" disabled value="dienthoai">
                          </div>
                          <div class="form-group">
                            <label for="giachinh">Giá chính</label>
                            <input type="text" placeholder="product's main price" class="form-control giachinh" id="giachinh" value="${product.price}">
                          </div>
                          <div class="form-group">
                            <label for="giaphu">Giá phụ</label>
                            <input type="text" placeholder="product's secondary price" class="form-control giaphu" id="giaphu" value="${product.giaphu}">
                          </div>
                          <div class="form-group">
                            <label for="anh">Ảnh sản phẩm</label>
                            <input type="file" placeholder="product's image file" class="form-control anh" id="anh">
                          </div>
                          <div class="w-100 d-flex justify-content-center mb-5">
                            <button
                              class="w-100 btn btn-primary sua btn-lg"
                              id="${product._id}" 
                              style="width: 100%; border-radius: 5px;"
                            >
                              Gửi
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" style="border-radius: 3px;">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `);
          fixProduct();
        });
      } else {
        $(".noidungbang").append("<h3 class='w-100 text-center'>Danh sách trống</h3>");
      }
    });
  });

  $("a.fixProduct#maytinh").unbind("click").on("click", function(event) {
    event.preventDefault();
    $(".noidungbang").html("<h2 class='w-100 text-center'>Sửa sản phẩm là máy tính</h2>");
    $.get(`/getproducts/maytinh`, function(data) {
      if(data.length) {
        $(".noidungbang").append(`
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        `);
        data.forEach((product, index) => {
          $(".noidungbang tbody").append(`
            <tr id="productId" data-uid="${product._id}">
              <th scope="row">${index + 1}</th>
              <td style="max-width: 200px; width: 200px;">
                <img src="data:${
                  product.file.contentType
                  }; base64, ${bufferToBase64(product.file.data.data)}" alt=""
                  style="width: 100%;"  
                >
              </td>
              <td>${product.productname}</td>
              <td>${product.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              </td>
              <td>
                <button
                  type="button" class="btn btn-primary btn-sm" style="border-radius: 3px;"
                  data-toggle="modal" 
                  data-target="#${product._id}"
                >
                  Sửa
                </button>
              </td>
            </tr>
          `);
          $(".noidungbang").append(`
            <div class="modal fade" id="${product._id}" tabindex="-1" role="dialog" aria-labelledby="${product._id}Title" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" style="border-radius: 5px; overflow: hidden;">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle" style="display: inline-block;">Chỉnh sửa sản phẩm ${product.productname}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="main">
                      <div class="container tim-container" style="width: 100%; padding-top: 0px;">
                        <div class="row col-12">
                          <div class="form-group">
                            <label for="name">Tên sản phẩm</label>
                            <input type="text" placeholder="product's name" class="form-control" id="name" value="${product.productname}">
                          </div>
                          <div class="form-group">
                            <label for="loai">Loại sản phẩm (viết liền không dấu)</label>
                            <input type="text" placeholder="product's kind" class="form-control loai" id="loai" disabled value="dienthoai">
                          </div>
                          <div class="form-group">
                            <label for="giachinh">Giá chính</label>
                            <input type="text" placeholder="product's main price" class="form-control giachinh" id="giachinh" value="${product.price}">
                          </div>
                          <div class="form-group">
                            <label for="giaphu">Giá phụ</label>
                            <input type="text" placeholder="product's secondary price" class="form-control giaphu" id="giaphu" value="${product.giaphu}">
                          </div>
                          <div class="form-group">
                            <label for="anh">Ảnh sản phẩm</label>
                            <input type="file" placeholder="product's image file" class="form-control anh" id="anh">
                          </div>
                          <div class="w-100 d-flex justify-content-center mb-5">
                            <button
                              class="w-100 btn btn-primary sua btn-lg"
                              id="${product._id}" 
                              style="width: 100%; border-radius: 5px;"
                            >
                              Gửi
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" style="border-radius: 3px;">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `);
          fixProduct();
        });
      } else {
        $(".noidungbang").append("<h3 class='w-100 text-center'>Danh sách trống</h3>");
      }
    });
  });

  $("a.fixProduct#tainghe").unbind("click").on("click", function(event) {
    event.preventDefault();
    $(".noidungbang").html("<h2 class='w-100 text-center'>Sửa sản phẩm là tai nghe</h2>");
    $.get(`/getproducts/tainghe`, function(data) {
      if(data.length) {
        $(".noidungbang").append(`
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        `);
        data.forEach((product, index) => {
          $(".noidungbang tbody").append(`
            <tr id="productId" data-uid="${product._id}">
              <th scope="row">${index + 1}</th>
              <td style="max-width: 200px; width: 200px;">
                <img src="data:${
                  product.file.contentType
                  }; base64, ${bufferToBase64(product.file.data.data)}" alt=""
                  style="width: 100%;"  
                >
              </td>
              <td>${product.productname}</td>
              <td>${product.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              </td>
              <td>
                <button
                  type="button" class="btn btn-primary btn-sm" style="border-radius: 3px;"
                  data-toggle="modal" 
                  data-target="#${product._id}"
                >
                  Sửa
                </button>
              </td>
            </tr>
          `);
          $(".noidungbang").append(`
            <div class="modal fade" id="${product._id}" tabindex="-1" role="dialog" aria-labelledby="${product._id}Title" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" style="border-radius: 5px; overflow: hidden;">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle" style="display: inline-block;">Chỉnh sửa sản phẩm ${product.productname}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="main">
                      <div class="container tim-container" style="width: 100%; padding-top: 0px;">
                        <div class="row col-12">
                          <div class="form-group">
                            <label for="name">Tên sản phẩm</label>
                            <input type="text" placeholder="product's name" class="form-control" id="name" value="${product.productname}">
                          </div>
                          <div class="form-group">
                            <label for="loai">Loại sản phẩm (viết liền không dấu)</label>
                            <input type="text" placeholder="product's kind" class="form-control loai" id="loai" disabled value="dienthoai">
                          </div>
                          <div class="form-group">
                            <label for="giachinh">Giá chính</label>
                            <input type="text" placeholder="product's main price" class="form-control giachinh" id="giachinh" value="${product.price}">
                          </div>
                          <div class="form-group">
                            <label for="giaphu">Giá phụ</label>
                            <input type="text" placeholder="product's secondary price" class="form-control giaphu" id="giaphu" value="${product.giaphu}">
                          </div>
                          <div class="form-group">
                            <label for="anh">Ảnh sản phẩm</label>
                            <input type="file" placeholder="product's image file" class="form-control anh" id="anh">
                          </div>
                          <div class="w-100 d-flex justify-content-center mb-5">
                            <button
                              class="w-100 btn btn-primary sua btn-lg"
                              id="${product._id}" 
                              style="width: 100%; border-radius: 5px;"
                            >
                              Gửi
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" style="border-radius: 3px;">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `);
          fixProduct();
        });
      } else {
        $(".noidungbang").append("<h3 class='w-100 text-center'>Danh sách trống</h3>");
      }
    });
  });

  $("a.addProductRapid").unbind("click").on("click", function(event) {
    event.preventDefault();
    $(".noidungbang").html("<h2 class='w-100 text-center'>Thêm sản phẩm</h2>");
    $(".noidungbang").append(`
      <div class="main">
        <div class="container tim-container" style="max-width: 800px; padding-top: 50px;">
          <div class="row col-12">
            <div class="form-group">
              <label for="name">Tên sản phẩm</label>
              <input type="text" placeholder="product's name" class="form-control" id="name">
            </div>
            <div class="form-group">
              <label for="loai">Loại sản phẩm (viết liền không dấu)</label>
              <select class="form-control w-100" id="loai">
                <option value="dienthoai">Điện thoại</option>
                <option value="maytinh">Máy tính</option>
                <option value="tainghe">Tai nghe</option>
              </select>
            </div>
            <div class="form-group">
              <label for="giachinh">Giá chính</label>
              <input type="text" placeholder="product's main price" class="form-control giachinh" id="giachinh">
            </div>
            <div class="form-group">
              <label for="giaphu">Giá phụ</label>
              <input type="text" placeholder="product's secondary price" class="form-control giaphu" id="giaphu">
            </div>
            <div class="form-group">
              <label for="anh">Ảnh sản phẩm</label>
              <input type="file" placeholder="product's image file" class="form-control anh" id="anh">
            </div>
            <div class="w-100 d-flex justify-content-center mb-5">
              <button class="w-100 btn btn-primary gui btn-lg" id="gui" style="width: 100%; border-radius: 5px;">Gửi</button>
            </div>
          </div>
        </div>
      </div>  
    `);
    addProduct();
  });
});