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

  /*
   * Dependencies
   * ============
   *
   * ObjectID.createFromHexString()
   * db.collection("notes").findOne()
  */
  function getOneNote(req, res, db, callback) {
    let id    = getID(req),
        query = makeQueryByID(id);
    fetchDocByID(db, query, callback);
  }

  function getID(req) {
    return req.params.id.substring(1);
  }

  function makeQueryByID(id) {
    return { _id: getMongoID(id) }
  }

  // Dependency!
  function getMongoID(id) {
    return ObjectID.createFromHexString(id);
  }

  // Dependency!
  function fetchDocByID(db, query, callback) {
    db.collection("notes")
      .findOne(query, function(err, doc) {
        assert.equal(null, err);
        callback(doc, query);
      });
  }
    






  

  module.exports = {
    postNote,
    getAllNotes,
    getOneNote
  }

}())