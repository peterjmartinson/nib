let View = function()
{

  'use strict';

  let edited_note_id;


  function editExistingNote(id)
  {
    this.edited_note_id = id;
  }

  function displayNote(note)
  {
    document.getElementById('edit-note').value;
  }

  return
  {
    editExistingNote: editExistingNote,
    displayNote: displayNote
  }

}
