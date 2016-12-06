$(function() {
  var $editor = $('#editor');
  marked.setOptions({
    langPrefix: ''
  });

  $editor.keyup(function(e) {
    // Enter
    if ( e.keyCode === 13 ) {
      var elem = e.target;
      var val = elem.value;
      var pos = elem.selectionStart;
      var beforecoursol = val.substr(0, pos);
      var lines = beforecoursol.split("\n");
      var lineNumber = lines.length - 2;
      var beforeLine = lines[lineNumber];
      var tabs = getTopTabs(beforeLine);
      $(this).insertAtCaret(tabs);
    }
    reload();
  });
  $editor.keydown(function(e){
    // tab
    if ( e.keyCode === 9 ) {
      e.preventDefault();
      $(this).insertAtCaret("\t");
    }
    reload();

  });

  function reload()
  {
    var src = $('#editor').val();
    $('#result').html(marked(src));
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }

  function getTopTabs(text)
  {
    var tabs = "";
    for ( var i = 0;i<text.length;i++ ) {
      var t = text.substr(i,1);
      if ( t === "\t" ) {
        tabs = tabs + "\t";
      }
    }
    return tabs;
  }

  // カーソル位置にテキスト挿入
  $.fn.extend({
    insertAtCaret: function(v) {
      var o = this.get(0);
      o.focus();
      var s = o.value;
      var p = o.selectionStart;
      var np = p + v.length;
      o.value = s.substr(0, p) + v + s.substr(p);
      o.setSelectionRange(np, np);
    }
  });
});
