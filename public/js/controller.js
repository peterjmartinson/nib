let Controller = function(model)
{
  'use strict';

  this.model = model;

  this.editExistingNote = function(id, callback)
  {
    this.model.getOneNote(id, function(error, data) {
      let data_out = data;
      if (error) callback(error);
      if (data instanceof Array)
      {
        data_out = data[0];
      }
      callback(null, data_out);
    });
  }

}
