(function () {
  "use strict";

  window.CSSIZER = window.CSSIZER || {};

  CSSIZER.editor = {

    settings: {
      indentWithTabs: false,
      smartIndent: true,
      tabSize: 2,
      lineWrapping: true,
      addModeClass: true,
      lineNumbers: false,
      electricChars: true,
      matchBrackets: true,
      tabMode:"shift",
      theme: "cssizer"
    },

    init: function () {
      $.get('/user/show', function (response) {
        $('#user-info').html(response);
      });

      var cssSettings = _.defaults({
        mode:'css'
      }, this.settings);

      $('.toggle').click(function () {
        $(this).parent().toggleClass('fullscreen');
      });

      this.cssEditor = CodeMirror.fromTextArea($('#css').get(0), cssSettings);

      var htmlSettings = _.defaults({
        htmlMode: true,
        mode:'htmlmixed'
      }, this.settings);

      this.htmlEditor = CodeMirror.fromTextArea($('#html').get(0), htmlSettings);
      this.htmlEditor.on('change', update);
      this.cssEditor.on('change', update);
      update();
    }
  };

  function update() {
    var css = CSSIZER.editor.cssEditor.getValue(),
      html = CSSIZER.editor.htmlEditor.getValue();

    CSSIZER.preview.update(css, html);
    CSSIZER.form.update(css, html);
  }
}());