(function () {
  "use strict";

  window.CSSIZER = window.CSSIZER || {};

  CSSIZER.form = {
    $form: $('#save-form'),
    $modal: $('.modal.save-modal'),

    init: function () {
      $('#save-trigger').click(showModal);
      this.$modal.find('.backdrop').click(hideModal);
    },

    update: function(css, html) {
      this.$form.find('input[name="files[CSS][content]"]').val(css);
      this.$form.find('input[name="files[HTML][content]"]').val(html);
    }
  };

  function showModal() {
    $('body').addClass('modal-open');
    CSSIZER.form.$modal.find('.content').anCss('bounceInUp');
    CSSIZER.form.$modal.find('.backdrop').anCss('fadeIn');
  }

  function hideModal() {
    CSSIZER.form.$modal.find('.content').anCss('bounceOutDown').anDone(function () {
      $('body').removeClass('modal-open');
    });
  }

}());