$(document).ready(function () {
  $(".btn.btn-primary.btn-lg.d-block").unbind("click").on("click", function(event) {
    event.preventDefault();
    let formEmpty = $("#name").val().length === 0 || $("#phone").val().length === 0 
                    || $("#address").val().length === 0 || document.getElementById("check").checked === false;
    var reg = new RegExp('^[0-9]+$');
    if(formEmpty || !reg.test($("#phone").val())) {
      alert("You must complete and validate checkbox the form and true format of your phone");
    } else {
      Swal.fire({
        title: 'Cảm ơn bạn!',
        text: 'Chúng tôi sẽ liên hệ lại với bạn theo những thông tin bạn xác nhận sớm nhất.',
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          #60af6085
          url("/images/nyan-cat.gif")
          center left
          no-repeat
        `
      })
    }
  });
});