let View = function()
{
  'use strict';

  this.edited_note_id = '';
  console.log("first note id:  " + this.edited_note_id);


  this.editExistingNote = function(id)
  {
    this.edited_note_id = id;
    console.log("second note id:  " + this.edited_note_id);
  }

  this.displayNote = function(note)
  {
    document.getElementById('edit-note').value;
  }

}
