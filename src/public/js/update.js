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

$(document).ready(function () {
  let username = $("div.userIsAdmin").text();
  if(username === "false") {
    Swal.fire({
      title: "Không thể thực hiện",
      text: `Bạn không phải quản trị viên của trang web, do đó không thể thực hiện tác vụ này`,
      icon: 'error',
      confirmButtonText: "Ok",
      confirmButtonColor: "green",
      width: "70rem",
      heightAuto: false,
      height: "30rem",
      allowOutsideClick: true
    }).then(result => {});
  }
  addProduct();
});