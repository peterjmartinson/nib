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
    let req = {
      body: { thenote: 'test note' }
    } // why doesn't this take in `before`?  also, db doesn't take
    let res = {};
    let db = {};
    db.collection = function(name) {
      return {
        insertOne: function(query, callback) {
          let error  = null,
              result = { ops: 1, doc: query };
          callback(error, result);
        }
      }
    }

    // TEST CASES
    it('should exist', function() {
      assert.equal(typeof noteCtrl.postNote, 'function');
    });
    
    it('should return some data', function(done) {
      noteCtrl.postNote(req, res, db, function(err, result) {
        assert.deepEqual(result.ops, 1);
        done();
      });
    });

  });

});

