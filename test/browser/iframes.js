'use strict';

var doc = document;

buster.testCase("Iframes", {
  tearDown: function() {
    doc.body.innerHTML = '';
    doc.head.innerHTML = '';
  },
  "Same origin data uri feature detection": function(done) {
    test.sameOriginDataUri(function(support) {
      if (doc.defaultView.navigator.userAgent.match(/webkit/i)) {
        refute(support);
      } else {
        assert(support);
      }
      done();
    });
  },
  "Create an iframe": function() {
    assert.equals(
      test.createPreview(true).src.split(':')[0],
      'data');
    assert.equals(
      test.createPreview(false).src,
      location.href + '#__preview__');
  },
  "Replace document content": function() {
    test.replaceDocumentContent(doc, {
      scripts: 'window.TESTING = true',
      styles: 'body{display:none}',
      html: 'TESTING'
    });
    assert.equals(doc.body.innerHTML, 'TESTING', 'Change body content');
    assert.equals(
      doc.defaultView.getComputedStyle(doc.body).getPropertyValue('display'),
      'none', 'Update document styles');
    assert(doc.defaultView.TESTING, 'Add and execute JavaScript');
  }
});