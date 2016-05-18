(function () {
  "use strict";

  window.CSSIZER = window.CSSIZER || {};

  CSSIZER.preview = {

    $iframe: $("#preview iframe"),

    init: function () {
      this.$htmlTarget = this.$iframe.contents().find('#html-target');
      this.$cssTarget = this.$iframe.contents().find('#css-target');
    },

    update: function (css, html) {
      this.$htmlTarget.html(html);
      this.$cssTarget.html(css);
    }
  };

}());