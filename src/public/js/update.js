$(document).ready(function () {
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