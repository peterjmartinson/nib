let View = function(controller)
{
  'use strict';

  let self = this;

  self.edited_note_id = '';

  self.editExistingNote = function(id)
  {
    self.edited_note_id = id;
    controller.editExistingNote(id, function(error, data) {
      self.displayNote(data);
    });
  }

  self.displayNote = function(note)
  {
    document.getElementById('edit-note').value = note.note_text;
    return 0;
  }

}
