let Model = function(db) {
  'use strict';
  
  function findById(id, callback) {
    let error, data;
    let query_output = db.filter(function(element) {
      return element._id === id;
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

window.model = new Model(window.notes);
