let Model = function(db) {
  'use strict';
  
  function findById(id, callback) {
    let error, data;
    let query_output = db.filter(function(note) {
      console.log("note._id: " + note._id);
      console.log("id: " + id);
      return note._id === id;
    });
    if (query_output.length === 0)
    {
      error = 404;
      data = null;
    }
    else
    {
      error = null;
      data = query_output[0];
    }

    callback(error, data);

  }

  return {
    findById: findById
  }
}

// window.model = new Model(window.notes);
