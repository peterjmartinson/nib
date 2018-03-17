let Handler = function() {

  function $post(route, parcel, callback) {
    let DONE = 4, OK = 200,
        request = new XMLHttpRequest(),
        error = null,
        response = null;
    if (!request) {
      console.log('Unable to create request.  Giving up.');
      return false; // replace with callback
    }
    request.open('POST', route);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(parcel);
    request.onreadystatechange = function() {
      if (request.readyState === DONE) {
        if (request.status === OK) {
          response = request.responseText;
        }
        else {
          error = "POST Error: " + request.status;
          console.log(error);
        }
      callback(error, response);
      }
    }
  }

  var save_note_button = document.getElementById("save-note");
  save_note_button.addEventListener("click", postNote, false);

  function postNote() {
    let note_text = document.getElementById("note").value;
    let created_date = new Date();
    let modified_date = created_date;
    let note_id = Date.parse(created_date);
    // check thiS!!!
  }

  function $get(route, callback) {
    let DONE = 4, OK = 200,
        request = new XMLHttpRequest(),
        error = null,
        response = null;
    if (!request) {
      console.log("Unable to create request.  Giving up.");
      return false;
    }
    request.open("GET", route);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState === DONE) {
        if (request.status === OK) {
          response = request.responseText;
        }
        else {
          error = request.status;
        }
        callback(error, response);
      }
    };
  }

  let getNote = function(id) {
    let route = "/get/:" + id;
    $get(route, function(err, data) {
      if (err) {
        displayError();
      }
      else {
        displayNote(data);
      }
    });
  };

  function displayError() {
    document.getElementById("edit-note").value = "Whoops! No Note!";
  }

  function displayNote(data) {
    document.getElementById("edit-note").value = JSON.parse(data).note_text;
  }

  function parseDate(note_object) {
    let created_date = new Date(note_object.created_date),
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        display_date = "";
    display_date += months[created_date.getMonth()];
    display_date += " " + created_date.getDate();
    display_date += ", " + created_date.getFullYear();
    return display_date;
  }

  function parseNote(note) {
    let created_date = parseDate(JSON.parse(note)),
        display_note = "";
    display_note += "Date: <strong>" + created_date + "</strong><br>";
    display_note += "Note:<br>";
    display_note += JSON.parse(note).note_text;
    return display_note;
  }

  return {
    getNote: getNote,
    postNote: postNote,
    $get: $get,
    $post: $post
  };
};

window.handler = new Handler;
  
