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

      let output_docs = [];

      for(let i = 0; i < docs.length; i++) {
        output_docs.push(formatForList(docs[i]));
      }

      callback(output_docs);
    });
  }

  function formatForList(doc) {
    let _id           = !!doc._id           ? doc._id                      : "missing",
        created_date  = !!doc.created_date  ? parseDate(doc.created_date)  : parseDate(new Date(0)),
        modified_date = !!doc.modified_date ? parseDate(doc.modified_date) : created_date,
        note_text     = !!doc.note_text     ? doc.note_text                : "missing",
        title         = !!doc.title         ? doc.title                    : note_text.substring(0, 30);
    return { _id: _id, created_date: created_date, modified_date: modified_date, note_text: note_text, title: title };
  }


  function parseDate(date) {
    if (!date) return 0;
    // let created_date = new Date(date),
    let created_date = "",
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        display_date = "";

    if (date instanceof Date) {
      created_date = new Date(date);
    }
    else {
      created_date = new Date(0);
    }
    display_date += months[created_date.getMonth()];
    display_date += " " + created_date.getDate();
    display_date += ", " + created_date.getFullYear();
    return display_date;
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
