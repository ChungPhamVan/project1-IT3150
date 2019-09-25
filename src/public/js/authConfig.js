function showRegisterForm() {
  $('.loginBox').fadeOut('fast', function() {
    $('.registerBox').fadeIn('fast');
    $('.login-footer').fadeOut('fast', function() {
      $('.register-footer').fadeIn('fast');
    });
    $('.modal-title').html('Đăng ký');
  });
  $('.error').removeClass('alert alert-danger').html('');

}

function showLoginForm() {
  $('#loginModal .registerBox').fadeOut('fast', function() {
    $('.loginBox').fadeIn('fast');
    $('.register-footer').fadeOut('fast', function() {
      $('.login-footer').fadeIn('fast');
    });

    $('.modal-title').html('Đăng nhập');
  });
  $('.error').removeClass('alert alert-danger').html('');
}

function openDangnhap() {
  setTimeout(function() {
    $('#loginModal').modal('show');
    showLoginForm();
  }, 230);
}

function openDangky() {
  setTimeout(function() {
    $('#loginModal').modal('show');
    showRegisterForm();
  }, 230);
}
