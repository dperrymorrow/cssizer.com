(function () {
  "use strict";
  window.CSSIZER = window.CSSIZER || {};

  window.CSSIZER.app = {

    loading: $('<div class="loading"><i class="icon-spinner3"></i></div>'),

    init: function () {
      CSSIZER.preview.init();
      CSSIZER.editor.init();
      CSSIZER.form.init();
      CSSIZER.lib.init();

      toggle();
      preventDouble();
    },

    showModal: function ($modal) {
      $('body').addClass('modal-open');
      $modal.addClass('active').find('.content').anCss('bounceInUp');

      $modal.find('.backdrop').anCss('fadeIn').click(function () {
        hideModal($modal);
      });

      $modal.find('.close').click(function () {
        hideModal($modal);
      });

      return this;
    },

    loadModal: function ($modal, url) {
      $modal.find('.well').html(this.loading)
        .load(url);
    }
  };

  function hideModal ($modal) {
    $modal.find('.content').anCss('bounceOutDown').anDone(function () {
      $('body').removeClass('modal-open');
      $modal.removeClass('active');
    });
  }

  function preventDouble() {
    $('body form.prevent-double').on('submit', function () {
      $(this).find('*[type="submit"]').attr('disabled', 'true').val('Sending...').text('Sending...');
      return true;
    });
  }

  function toggle() {
    $('.toggle').click(function () {
      $(this).parent().toggleClass('fullscreen');
    });
  }

}());