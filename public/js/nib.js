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
    let route = '/get/:' + id;
    $get(route, function(data) {
      let payload = JSON.parse(data);
      console.log(payload);
    });
  }

  return {
    getNote: getNote
  }
}

window.handler = new Handler;
  
