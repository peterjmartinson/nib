let Ajax = function() {

  function $get(route, callback) {
    let DONE = 4, OK = 200,
        request = new XMLHttpRequest();
    if (!request) {
      console.log("Unable to create request.  Giving up.");
      return false;
    }
    request.open("GET", route);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === DONE) {
        if (request.status === OK) {
          let response = request.responseText;
          callback(null, response);
        }
        else {
          callback(request.status);
        }
      }
    };
  }

  return {
    $get: $get
  };
}

window.ajax = new Ajax;
