let Model = function(store) {

  this.store = store;

  this.getOneNote = function(id, callback) {
    let error = null;
    let data = null;
    this.store.findOneById(id, function(error, data) {
      callback(error, data);
    });
  }

}
