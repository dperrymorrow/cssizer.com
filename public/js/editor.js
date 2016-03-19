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
      lineNumbers: true,
      electricChars:true,
      matchBrackets:true,
      indentWithTabs:false,
      tabMode:"shift",
      theme: "tomorrow-night-eighties"
    },

    init: function () {
      $.get('/user/show', function (response) {
        $('#user-info').html(response);
      });

      var cssSettings = _.defaults({
        mode:'css'
      }, this.settings);

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
  }

  function update() {
    CSSIZER.preview.update(
      CSSIZER.editor.cssEditor.getValue(), CSSIZER.editor.htmlEditor.getValue()
    );
  }
}());