let Controller = function(model, view) {

  function editExistingNote(id, callback)
  {
    model.getOneNote(id, function(error, data) {
      let data_out = data;
      if (error) callback(error);
      if (data instanceof Array)
      {
        data_out = data[0];
      }
      callback(null, data_out);
    });
  }

  return {
    editExistingNote: editExistingNote
  }

}
