let Controller = function() {

  function editExistingNote(id, callback) {
    callback(null, 1);
  }

  return {
    editExistingNote: editExistingNote
  }

}
