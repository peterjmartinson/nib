let Handler = function() {

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
          callback(response);
        }
        else {
          console.log("GET Error: " + request.status);
        }
      }
    };
  }
    
  // not working yet!!
  let getNote = function(id) {
    let route = "/get/:" + id;
    $get(route, function(data) {
      let display_note = parseNote(data);
      document.getElementById("cowport").innerHTML = display_note;
    });
  };

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
    getNote: getNote
  };
};

window.handler = new Handler;
  
