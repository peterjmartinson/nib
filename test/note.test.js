const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      noteCtrl = require('../controllers/note.ctrl');


describe('The canary', function() {
  it('tweets', function() {
    assert.ok(true);
  });
});

describe('noteCtrl', function() {

  // before(function() {
  //   let db = {};
  // });

  describe('postNote()', function() {

    beforeEach(function() {
      let req = {
        body: { thenote: 'test note' }
      }

      let db = {};

      db.collection = function(name) {
        return {
          insertOne: function(query, callback) {
            let error  = null,
                result = { ops: 1 };
            callback(error, result);
          }
        }
      }
    });

    it('should exist', function() {
      assert.equal(typeof noteCtrl.postNote, 'function');
    });
    
    it('should return some data', function(done) {
      let req = {
        body: { thenote: 'test note' }
      } // why doesn't this take in `before`?  also, db doesn't take
      let res = {};
      let db = {};
      db.collection = function(name) {
        return {
          insertOne: function(query, callback) {
            let error  = null,
                result = { ops: 1 };
            callback(error, result);
          }
        }
      }
      console.log("req:  " + req);
      console.log("res:  " + res);
      console.log("db:  " + db);
      noteCtrl.postNote(req, res, db, function(err, result) {
        assert.deepEqual(result.ops, 1);
        done();
      });
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
