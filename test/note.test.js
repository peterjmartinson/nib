const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      ObjectID = require('mongodb').ObjectID,
      noteCtrl = require('../src/controllers/note.ctrl');
      noteView = require('../src/view/note.view');


describe('The canary', function() {
  it('tweets', function() {
    assert.ok(true);
  });
});

describe('noteCtrl', function() {

  describe('postNote()', function() {

    let test_date, test_data,
        ran = false,
        test_note = "test note",
        req = { body: { thenote: test_note } },
        res = {},
        db = {};

    function insertOne(ops) {
      test_date = ops.created_date;
      test_data = ops.note_text;
      ran = true;
      return ops;
    }

    db.collection = function(name) {
      return {
        insertOne: insertOne
      }
    }

    // TEST CASES
    it('should exist', function() {
      assert.equal(typeof noteCtrl.postNote, 'function');
    });
    
    it('should run the query', function() {
      noteCtrl.postNote(req, res, db);
      assert.equal(ran, true);
    });

    it('should create a date', function() {
      noteCtrl.postNote(req, res, db);
      assert(test_date instanceof Date);
    });

    it('should post data', function() {
      noteCtrl.postNote(req, res, db);
      assert.equal(test_data, test_note);
    });

  });

  describe('getAllNotes()', function() {
    // SETUP
    let ran = false,
        req = {},
        res = {},
        db = {};

    function toArray(callback) {
      let err = null,
          docs = '';
      ran = true;
      callback(null, docs);
    }

    function find() {
      return {
        toArray: toArray
      }
    }

    db.collection = function(name) {
      return {
        find: find
      }
    }

    // TESTS
    it('should exist', function() {
      assert.equal(typeof noteCtrl.getAllNotes, 'function');
    });

    it('should run .toArray()', function() {
      noteCtrl.getAllNotes(req, res, db, function(docs) {
        assert.equal(ran, true);
      });
    });
  });

  describe('getOneNote()', function() {
  // should retrieve one full note object from the DB
  // req: contains { params: { id: *hex string* } }
  // res: doesn't need to contain anything
  // var query: uses MongoDB's ObjectID dependency
  // ObjectID: contains { function createFromHexString(id) }
  // createFromHexString: returns some object (string?)
  // db: contains { collection(*string*) { returns { findOne (query)}}}
  // findOne: takes (query, callback)
  // callback: takes (doc)
  // doc: object of form {_id, created_date, note_text}
  // ultimately, getOneNote should send a *doc* to the callback

  // so, require MongoDB.ObjectID, fake everything else, and make sure a *doc* gets returned
    // SETUP
    let ran = false,
        req = { params: { id: ":aaaaaaaaaaaaaaaaaaaaaaaa"}},
        res = {},
        db = {};

    function findOne(query, callback) {
      let err = null, docs = '';
      ran = true;
      callback(null, docs);
    }

    // note:  this replaces the other db, because it's passed as a parameter
    db.collection = function(name) {
      return {
        findOne: findOne
      }
    }

    // TESTS
    it('should exist', function() {
      assert.equal(typeof noteCtrl.getOneNote, 'function');
    });

    it('should run .findOne()', function() {
      noteCtrl.getOneNote(req, res, db, function(doc) {
        assert.equal(ran, true);
      });
    });

    it('should create a query', function() {
      let expected_query = { _id: "aaaaaaaaaaaaaaaaaaaaaaaa" };
      noteCtrl.getOneNote(req, res, db, function(doc, query) {
        assert.equal(query._id, expected_query._id);
      });
    });

  });

});

describe('noteView', function() {

  describe ('viewNotes()', function() {

    it('should exist', function() {
      assert.equal(typeof noteView.viewNotes, 'function');
    });

    it('should return an array', function() {
      let doc_01 = { _id: 1000, created_date: new Date(2017-12-01), note_text: 'test 1000' },
          doc_02 = { _id: 1001, created_date: new Date(2017-12-02), note_text: 'test 1001' },
          doc_03 = { _id: 1002, created_date: new Date(2017-12-03), note_text: 'test 1002' };
      let docs = [doc_01, doc_02, doc_03];

      let test_result = noteView.viewNotes(docs);

      assert.equal(test_result.length, 3);
    });

    it('should return an array that contains date fields', function() {
      let test_date = new Date(2017-12-01);
      let doc_01 = { _id: 1000, created_date: new Date(2017-12-01), note_text: 'test 1000' },
          doc_02 = { _id: 1001, created_date: new Date(2017-12-02), note_text: 'test 1001' },
          doc_03 = { _id: 1002, created_date: new Date(2017-12-03), note_text: 'test 1002' };
      let docs = [doc_01, doc_02, doc_03];

      let test_result = noteView.viewNotes(docs);

      assert.deepEqual(test_result[0].created_date, test_date);
    });

    it('should return an array with note text fields', function() {
      let test_text = "How now brown cow?"
      let doc_01 = { _id: 1000, created_date: new Date(2017-12-01), note_text: test_text },
          doc_02 = { _id: 1001, created_date: new Date(2017-12-02), note_text: 'test 1001' },
          doc_03 = { _id: 1002, created_date: new Date(2017-12-03), note_text: 'test 1002' };
      let docs = [doc_01, doc_02, doc_03];

      let test_result = noteView.viewNotes(docs);

      assert.deepEqual(test_result[0].note_text, test_text);
    });


  });
});

