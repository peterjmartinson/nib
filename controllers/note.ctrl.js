(function() {
  'use strict';

  function postNote(req, res, db, callback) {
    // console.log("You just tried to post, Sucker!");
    // console.log(req.body.thenote);

    let new_document = {
      created_date : new Date(),
      note_text : req.body.thenote
    }

    db.collection("notes")
      .insertOne(new_document, function(err, result) {
      callback(err, result);
    });

  }

  function getAllNotes(req, res, db, callback) {
  }



  module.exports = {
    postNote,
    getAllNotes
  }

}())
