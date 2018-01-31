(function() {
  'use strict';

  const assert = require('assert');

  function postNote(req, res, db, callback) {
    let new_document = {
      created_date : new Date(),
      note_text : req.body.thenote,
      title: req.body.thenote.substring(0, req.body.thenote.indexOf('\r\n'))
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

  function getOneNote(req, res, db, callback) {
    let query = { _id: ObjectId(req.params.id.substring(1)) };
    let cursor = db.collection("notes").find(query);
    cursor.toArray(function(err, docs) {
      assert.equal(null, err);
      console.log("from getOneNote: " + docs);
      callback(docs[0]);
    });
  }

  function getNoteList(req, res, db, callback) {
    return 1;
  }

  module.exports = {
    postNote,
    getAllNotes,
    getNoteList,
    getOneNote
  }

}())
