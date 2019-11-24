function addProduct() {
  $("#gui").unbind("click").on("click", function() {
    let validate = $("input#name").val() != "" && $("input#giachinh").val() != "" && $("input#giaphu").val() != "" && typeof($("input#anh").prop("files")[0]) !=="undefined";
    if(!validate) {
      alert("Bạn phải hoàn thành đầy đủ mẫu bên dưới!");
    } else {
      Swal.fire({
        title: 'Bạn có chắc muốn thêm không?',
        text: "Bạn không thể khôi phục tác vụ này",
        icon: 'danger',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if(result.value) {
          let formData = new FormData();
          formData.append("name", $("input#name").val());
          formData.append("loai", $("#loai").val());
          formData.append("giachinh", $("input#giachinh").val().trim().replace(".", "").replace(".", ""));
          formData.append("giaphu", $("input#giaphu").val().trim().replace(".", "").replace(".", ""));
          formData.append("anh", $("input#anh").prop("files")[0]);
          $.ajax({
            type: "post",
            url: "/update",
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            success: function(data) {
    
            }
          });
          $("input#name").val("");
          $("input#giachinh").val("");
          $("input#giaphu").val("");
        }
      });
    }
  });
}
function taskAdmin() {
  $(".btn.plusAdmin").unbind("click").on("click", function() {
    Swal.fire({
      title: 'Bạn chắc không?',
      text: "Việc cấp quyền sẽ làm người này có quyền thao tác trên cơ sở dữ liệu web",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.value) {
        let userId = $(this).closest("#userId").data("uid").trim();
        $.get("/plususer", { userId: userId }, function(data) {
          if(data) {
            $("table tbody").find(`tr[data-uid = ${userId}]`).remove();
          }
        });
      }
    })    
  });
  $(".btn.minusAdmin").unbind("click").on("click", function() {
    Swal.fire({
      title: 'Bạn chắc không?',
      text: "Việc này sẽ làm người này không còn quyền thao tác trên cơ sở dữ liệu web",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.value) {
        let userId = $(this).closest("#userId").data("uid").trim();
        $.get("/minususer", { userId: userId }, function(data) {
          if(data) {
            $("table tbody").find(`tr[data-uid = ${userId}]`).remove();
          }
        });
      }
    })
  });
  $(".btn.removeUser").unbind("click").on("click", function() {
    Swal.fire({
      title: 'Bạn chắc không?',
      text: "Việc này sẽ xóa bỏ tài khoản của người dùng này từ hệ thống",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.value) {
        let userId = $(this).closest("#userId").data("uid").trim();
        $.get("/removeuser", { userId: userId }, function(data) {
          if(data) {
            $("table tbody").find(`tr[data-uid = ${userId}]`).remove();
          }
        });
      }
    })
  });
  $(".btn.removeProduct").unbind("click").on("click", function() {
    Swal.fire({
      title: 'Bạn chắc không?',
      text: "Bạn không thể khôi phục tác vụ này",
      icon: 'danger',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if(result.value) {
      let productId = $(this).closest("#productId").data("uid").trim();
      $.get("/removeproduct", { productId: productId }, function(data) {

      });
      }
    });
  });
}
function fixProduct() {
  $(".btn.sua").unbind("click").on("click", function() {
    let parent = $(this).closest("div.modal-body");
    let id = $(this).attr("id");
    let name = parent.find("input#name").val().trim();
    let loai = parent.find("input#loai").val().trim();
    let giachinh = parent.find("input#giachinh").val().trim();
    let giaphu = parent.find("input#giaphu").val().trim();
    let anh = parent.find("input#anh").prop("files")[0];
    let validate = id !== "" && name !== "" && giachinh !== "" && giaphu !== "" && typeof(anh) !== "undefined";
    if(!validate) {
      alert("Bạn phải hoàn thành đầy đủ mẫu bên dưới!");
    } else {
      Swal.fire({
        title: 'Bạn có chắc muốn thay đổi không?',
        text: "Bạn không thể khôi phục tác vụ này",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if(result.value) {
          let formData = new FormData();
          formData.append("id", id);
          formData.append("name", name);
          formData.append("loai", loai);
          formData.append("giachinh", giachinh.replace(".", "").replace(".", ""));
          formData.append("giaphu", giaphu.replace(".", "").replace(".", ""));
          formData.append("anh", anh);
          $.ajax({
            type: "post",
            url: "/update",
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            success: function(data) {
            }
          });
          parent.next().find("button.btn").click();
        }
      });
    }
  });
}