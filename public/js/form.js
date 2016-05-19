(function () {
  "use strict";

  window.CSSIZER = window.CSSIZER || {};

  CSSIZER.form = {
    $form: $('#save-form'),
    $modal: $('#modal'),

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
    $('#modal .content').anCss('bounceInUp');
    $('#modal .backdrop').anCss('fadeIn');
  }

  function hideModal() {
    $('#modal .content').anCss('bounceOutUp').anDone(function () {
      $('body').removeClass('modal-open');
    });
  }

}());