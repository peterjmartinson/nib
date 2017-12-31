const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      noteCtrl = require('../controllers/note.ctrl');


describe('The canary', function() {
  it('tweets', function() {
    assert.ok(true);
  });
});

describe('noteCtrl', function() {

  before(function() {
    let db = {};
  });

  describe('postNote()', function() {

    before(function() {
      let req = {
        body: { the_note: 'test note' }
      }

      db.collection = function(collection) {
        return {
          insertOne: function(query, callback) {
            return 1
          }
      }
    });

    it('should exist', function() {
      assert.equal(typeof noteCtrl.postNote, 'function');
    });
    
    it('should return some data', function() {
      
      assert.notEqual(noteCtrl.postNote(req, res, db), 
    });
  });

});

  function postNote(req, res, db) {
    console.log("You just tried to post, Sucker!");
    console.log(req.body.thenote);

    db.collection("notes").insertOne({
      created_date : new Date(),
      note_text : req.body.thenote
    });
    res.redirect('/');
  }
