(function () {
  "use strict";
  window.CSSIZER = window.CSSIZER || {};

  CSSIZER.lib = {

    $modal: $('#lib-modal'),

    init: function () {
      $('#lib-trigger').click($.proxy(this, 'loadModal'));
    },

    loadModal: function () {
      CSSIZER.app.showModal(this.$modal)
        .loadModal(this.$modal, '/gist/index');
    }
  };


}());