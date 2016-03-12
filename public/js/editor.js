(function () {
  "use strict";

  window.CSSIZER = window.CSSIZER || {};

  CSSIZER.editor = {

    init: function () {
      $.get('/user/show', function (response) {
        $('#user-info').html(response);
      });
    }

  }
}());