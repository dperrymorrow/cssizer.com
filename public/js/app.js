(function () {
  "use strict";
  window.CSSIZER = window.CSSIZER || {};

  window.CSSIZER.app = {
    init: function () {
      CSSIZER.preview.init();
      CSSIZER.editor.init();
      CSSIZER.form.init();
      CSSIZER.lib.init();

      toggle();
    },

    showModal: function ($modal) {
      $('body').addClass('modal-open');
      $modal.addClass('active').find('.content').anCss('bounceInUp');
      $modal.find('.backdrop').anCss('fadeIn').click($.proxy(this, 'hideModal'));
    },

    hideModal: function (event) {
      var $modal = $(event.currentTarget).parent();
      $modal.find('.content').anCss('bounceOutDown').anDone(function () {
        $('body').removeClass('modal-open');
        $modal.removeClass('active');
      });
    }
  };

  function toggle() {
    $('.toggle').click(function () {
      $(this).parent().toggleClass('fullscreen');
    });
  }

}());