let Handler = function()
{

  // let getNote = function(id)
  function getNote(id)
  {
    let route = "/get/:" + id;
    console.log(id);
    window.model.findById(id, function(err, data)
    // window.ajax.$get(route, function(err, data)
    {
      if (err)
      {
        displayError(err);
      }
      else
      {
        displayNote(data);
      }
    });
  };

  function displayError(error)
  {
    let error_message = error === 404 ? "Whoops! No note!" : "Error: " + error;
    document.getElementById("edit-note").value = error_message;
  }

  function displayNote(data)
  {
    document.getElementById("edit-note").value = data.note_text;
    // document.getElementById("edit-note").value = JSON.parse(data).note_text;
  }

  function parseDate(note_object)
  {
    let created_date = new Date(note_object.created_date),
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        display_date = "";
    display_date += months[created_date.getMonth()];
    display_date += " " + created_date.getDate();
    display_date += ", " + created_date.getFullYear();
    return display_date;
  }

  function parseNote(note)
  {
    let created_date = parseDate(JSON.parse(note)),
        display_note = "";
    display_note += "Date: <strong>" + created_date + "</strong><br>";
    display_note += "Note:<br>";
    display_note += JSON.parse(note).note_text;
    return display_note;
  }

  function sayHello() { console.log("hello"); return 1; };
  return {
    getNote: getNote,
    sayHello: sayHello
  };
};

window.handler = new Handler();
