const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      noteCtrl = require('../controllers/note.ctrl');


describe('The canary', function() {
  it('tweets', function() {
    assert.ok(true);
  });
});

describe('noteCtrl', function() {



  describe('postNote()', function() {

    // SETUP
    function insertOne(ops, callback) {
      let error  = null,
          result = { ran: true, ops: ops };
      callback(error, result);
    }

    let test_note = "test note",
        req = { body: { thenote: test_note } },
        res = {},
        db = {};

    db.collection = function(name) {
      return {
        insertOne: insertOne
      }
    }

    // TEST CASES
    it('should exist', function() {
      assert.equal(typeof noteCtrl.postNote, 'function');
    });
    
    it('should run the query', function(done) {
      noteCtrl.postNote(req, res, db, function(err, result) {
        assert.ok(result.ran);
        done();
      });
    });

    it('should create a date', function(done) {
      noteCtrl.postNote(req, res, db, function(err, result) {
        assert(result.ops.created_date instanceof Date);
        done();
      });
    });

    it('should post data', function(done) {
      noteCtrl.postNote(req, res, db, function(err, result) {
        assert.deepEqual(result.ops.note_text, test_note);
        done();
      });
    });

  });

  describe('getAllNotes()', function() {
    it('should exist', function() {
      assert.equal(typeof noteCtrl.getAllNotes, 'function');
    });
  });

});

