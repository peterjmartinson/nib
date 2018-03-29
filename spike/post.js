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

  // var save_note_button = document.getElementById("save-note");
  // save_note_button.addEventListener("click", postNote, false);

  /*
   * 1. call the save_note handler function (A)
   * 2. handler gets the text of the note
   * 3. Somehow, if it's an exisiting note, the note_id has to be gotten too
   * 4. handler passes the note text to the posting function (B)
   * 5. Function B --- this is shit.  You need to *initiate a note editing session*, which will create the note_id automatically
   *  The note editing session is initiated by either 1. hitting an "initiate" button, or 2. clicking on one of the existing notes.
  */
  // function postNote(note_text, note_id, created_date) {
  //   let post_note_text = document.getElementById("note").value;
  //   let post_created_date = new Date();
  //   let post_modified_date = created_date;
  //   let post_note_id = Date.parse(created_date);
  //   return {
  //     note_text: note_text,
  //     created_date: created_date,
  //     modified_date: modified_date,
  //     note_id: note_id
  //   }
  //   // check thiS!!!
  // }


