$(document).ready(function () {
  let username = $("div.username").text();
  if(username && username !== "chung.pv172983") {
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
  $("#gui").unbind("click").on("click", function() {
    let formData = new FormData();
    formData.append("name", $("input#name").val());
    formData.append("loai", $("input#loai").val());
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
    $("input#loai").val("");
    $("input#giachinh").val("");
    $("input#giaphu").val("");
  });
});