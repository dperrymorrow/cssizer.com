(function () {
  "use strict";

  window.CSSIZER = window.CSSIZER || {};

  CSSIZER.form = {
    $form: $('#save-form'),
    $modal: $('#save-modal'),

    init: function () {
      $('#save-trigger').click(function () {
        CSSIZER.app.showModal(this.$modal);
      }.bind(this));
    },

    update: function(css, html) {
      this.$form.find('input[name="files[CSS][content]"]').val(css);
      this.$form.find('input[name="files[HTML][content]"]').val(html);
    }
  };

}());