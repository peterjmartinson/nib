let Controller = function() {

  function editExistingNote(id, callback)
  {
    model.getOneNote(id, function(error, data) {
      if (error) callback(error);
      else callback(null, data);
    });
  }

  return {
    editExistingNote: editExistingNote
  }

}
