(function () {
  "use strict";
  window.CSSIZER = window.CSSIZER || {};

  CSSIZER.lib = {

    $modal: $('#lib-modal'),
    $ajaxTarget: $('#lib-modal .content'),

    init: function () {
      $('#lib-trigger').click($.proxy(this, 'loadModal'));
    },

    loadModal: function () {
      CSSIZER.app.showModal(this.$modal);
      this.$ajaxTarget.load('/gists/index');
    }
  };


}());