(function() {
  'use strict';

  const assert = require('assert');
  const ObjectID = require('mongodb').ObjectID;

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
    let id = req.params.id.substring(1),
        query = { _id: ObjectID.createFromHexString(id) },
        cursor = db.collection("notes");
    cursor.findOne(query, function(err, doc) {
      assert.equal(null, err);
      callback(doc);
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
