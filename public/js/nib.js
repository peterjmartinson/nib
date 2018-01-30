let Handler = function() {

  function $get(route, callback) {
    let DONE = 4, OK = 200,
        request = new XMLHttpRequest();
    if (!request) {
      console.log('Unable to create request.  Giving up.');
      return false;
    }
    request.open('GET', route);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === DONE) {
        if (request.status === OK) {
          let response = request.responseText;
          callback(response);
        }
        else {
          console.log('GET Error: ' + request.status);
        }
      }
    }
  };
    
  // not working yet!!
  let getNote = function(id) {
    $get('/api/todo', function(data) {
      var todos = JSON.parse(data);
      callback.call(this, todos.filter(function (todo) {
        for (var q in query) {
          if (query[q] !== todo[q]) {
            return false;
          }
        }
        return true;
      }));
    });
  }
  



}

window.handler = new Handler;












let Key = function() {

  function sendKeyPress(keypress) {
    document.getElementById("cowport").innerHTML = keypress;
  }

  return {
    sendKeyPress: sendKeyPress
  };

};

window.key = new Key;

