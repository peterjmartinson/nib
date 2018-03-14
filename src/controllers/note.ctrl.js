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
      // now, read each object into this doc.  You're modifying the original array!!!

      for(let i = 0; i < docs.length; i++) {

        let temp_object = {_id:"", created_date:"", modified_date:"", note_text:"", title:""};

        temp_object._id = !!docs[i]._id ? docs[i]._id : "missing";
          console.log("original (" + i + "): " + docs[i].created_date);
        temp_object.created_date = !!docs[i].created_date ? docs[i].created_date : new Date(0);
          console.log("after (" + i + "): " + temp_object.created_date);
        temp_object.modified_date = !!docs[i].modified_date ? docs[i].modified_date : docs[i].created_date;
        temp_object.note_text = !!docs[i].note_text ? docs[i].note_text : "missing";
        temp_object.title = !!docs[i].title ? docs[i].title : temp_object.note_text.substring(0, 30);
        temp_object.created_date = parseDate(temp_object.created_date);

        output_docs.push(temp_object);
        // if ( !docs[i]._id ) {
        //   docs[i]._id = "missing";
        // }

        // if ( !docs[i].created_date ) {
        //   console.log("before (" + i + "): " + docs[i].created_date);
        //   docs[i].created_date = new Date(0);
        //   console.log("after (" + i + "): " + docs[i].created_date);
        // }

        // if ( !docs[i].modified_date ) {
        //   docs[i].modified_date = docs[i].created_date;
        // }

        // if ( !docs[i].note_text ) {
        //   docs[i].note_text = "missing";
        // }

        // // Make a better title-parser!!
        // if ( !docs[i].title ) {
        //   docs[i].title = docs[i].note_text.substring(0, 30);
        // }

        // docs[i].created_date = parseDate(docs[i].created_date);

      }

      callback(output_docs);
    });
  }

  function parseDate(date) {
    let created_date = new Date(date),
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        display_date = "";
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
