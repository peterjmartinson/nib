let Storage = function(db) {
  'use strict';
  
  function findOneById(id, callback) {
    let error, data;
    let query_output = db.filter(function(note) {
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

  function findAll(callback) {
    let data = db;
    callback(null, data);
  }

  return {
    findOneById: findOneById,
    findAll: findAll
  }
}


