(function() {
  'set strict';

  window.ajax       = new Ajax();
  window.storage    = new Storage(window.notes);
  window.model      = new Model(window.storage);
  window.controller = new Controller(window.model);
  window.view       = new View(window.controller);

})();
