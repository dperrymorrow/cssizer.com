(function () {
  "use strict";

  window.CSSIZER = window.CSSIZER || {};

  CSSIZER.preview = {

    init: function () {
      var $iframe = $("#preview iframe");
      this.$htmlTarget = $iframe.contents().find('#html-target');
      this.$cssTarget = $iframe.contents().find('#css-target');
    },

    update: function (css, html) {
      this.$htmlTarget.html(html);
      this.$cssTarget.html(css);
    }
  }

}());