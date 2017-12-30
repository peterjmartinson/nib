(function() {
  'use strict';

  function postNote(req, res, db) {
    console.log("You just tried to post, Sucker!");
    console.log(req.body.thenote);

    db.collection("notes").insertOne({
      created_date : new Date(),
      note_text : req.body.thenote
    });
    res.redirect('/');
  }

  module.exports = {
    postNote
  }

}())
