
$.fn.extend({
  anCss: function (animationName) {
    $(this).addClass('animated ' + animationName).anDone(function () {
      $(this).removeClass('animated ' + animationName);
    });
    return $(this);
  },
  anDone: function (callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).one(animationEnd, callback);
    return $(this);
  }
});