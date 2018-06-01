let Model = function(store) {

  function getOneNote(id, callback) {
    let error = null;
    let data = null;
    store.findOneById(id, function(error, data) {
      callback(error, data);
    });
  }

  return {
    getOneNote: getOneNote
  }
}
