(function() {
  'use strict';

  const assert = require('assert');

  function postNote(req, res, db, callback) {
    let new_document = {
      created_date : new Date(),
      note_text : noteToHTML(req.body.thenote)
    }

    db.collection("notes").insertOne(new_document);

  }

  function getAllNotes(req, res, db, callback) {
    let cursor = db.collection("notes").find();
    cursor.toArray(function(err, docs) {
      assert.equal(null, err);
      callback(docs);
    });
  }

  function noteToHTML(note) {
    let carriage_return = /\r\n/g;
    return note.replace(carriage_return, '<br>');
  }

  module.exports = {
    postNote,
    getAllNotes
  }

}())
