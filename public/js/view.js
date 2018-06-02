let View = function(controller)
{
  'use strict';


  function editExistingNote(id)
  {
    controller.editExistingNote(id, function(error, data) {
      console.log('error: ' + error);
      console.log('data: ' + data);
      if (error) displayNote(error);
      else displayNote(data.note_text);
    });
  }

  function displayNote(note)
  {
    document.getElementById('edit-note').value = note;
    return 0;
  }

  return {
    editExistingNote: editExistingNote,
    displayNote: displayNote
  }

}
