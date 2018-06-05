$(function () {
  /*$('.addCommentBtn').click(() => {
    $('.customPopover').addClass('show');
  });
  $('#commentNowBtn').click(() => {
    $('#customPopOver').removeClass('show');
  });*/
});

$('#infoListContainer').modal('handleUpdate');

$('body').ready(function() {
  $('#registerButton').click(function () {
    $('#loginTab').removeClass('active');
    $('#registerTab').addClass('active');
    $('#login').removeClass('active show');
    $('#register').addClass('active show');
  });
  $('#registerBtn').click(function () {
    $('#loginTab').addClass('active');
    $('#registerTab').removeClass('active');
    $('#login').addClass('active show');
    $('#register').removeClass('active show');
  })
});
