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
        db = {},

        id = [1000, 1002, 1003],
        title = ["Note 1", "Note 2", "Note 3"],
        note_text = ["Hey diddle diddle, the cat and the fiddle", "Little Miss Muffet sat on her tuffet", "Humpty Dumpty sat on a wall"],
        created_date = [new Date(2017-12-01), new Date(2017-12-02), new Date(2017-12-03)],
        modified_date = [new Date(2018-12-01), new Date(2018-12-02), new Date(2018-12-03)],

        doc_00 = { _id: id[0], created_date: created_date[0], modified_date: modified_date[0], note_text: note_text[0], title: title[0] },
        doc_01 = { created_date: created_date[1], modified_date: modified_date[1], note_text: note_text[1], title: title[1] },
        doc_02 = { _id: id[2], modified_date: modified_date[2], note_text: note_text[2], title: title[2] },
        doc_03 = { _id: id[3], created_date: created_date[3], note_text: note_text[3], title: title[3] },
        doc_04 = { _id: id[4], created_date: created_date[4], modified_date: modified_date[4], title: title[4] },
        doc_05 = { _id: id[5], created_date: created_date[5], modified_date: modified_date[5], note_text: note_text[5] };

    function toArray(callback) {
      let err = null,
          docs = [doc_00, doc_01, doc_02, doc_03, doc_04, doc_05];
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

    it('should pass an array to a callback', function() {
      noteCtrl.getAllNotes(req, res, db, function(argument) {
        assert.ok(argument instanceof Array);
      });
    });

    it('should pass an array with "_id" to a callback', function() {
      let has_ids = true;
      noteCtrl.getAllNotes(req, res, db, function(argument) {
        for (let i = 0; i < argument.length; i++) {
          if (!argument[i]._id) {
            has_ids = false;
          }
        }
        assert.ok(has_ids);
      });
    });

    it('should pass an array with "created_date" to a callback', function() {
      let has_dates = true;
      noteCtrl.getAllNotes(req, res, db, function(argument) {
        for (let i = 0; i < argument.length; i++) {
          if (!argument[i].created_date) {
            has_dates = false;
          }
        }
        assert.ok(has_dates);
      });
    });

    it('should pass an array with "title" to a callback', function() {
      let has_titles = true;
      noteCtrl.getAllNotes(req, res, db, function(argument) {
        for (let i = 0; i < argument.length; i++) {
          if (!argument[i].title) {
            has_titles = false;
          }
        }
        assert.ok(has_titles);
      });
    });

    it('should pass an array with "modified_date" to a callback', function() {
      let has_modified_dates = true;
      noteCtrl.getAllNotes(req, res, db, function(argument) {
        for (let i = 0; i < argument.length; i++) {
          if (!argument[i].modified_date) {
            has_modified_dates = false;
          }
        }
        assert.ok(has_modified_dates);
      });
    });

    it('should pass an array with "note_text" to a callback', function() {
      let has_note_texts = true;
      noteCtrl.getAllNotes(req, res, db, function(argument) {
        for (let i = 0; i < argument.length; i++) {
          if (!argument[i].note_text) {
            has_note_texts = false;
          }
        }
        assert.ok(has_note_texts);
      });
    });


  });

  describe('getOneNote()', function() {

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
      let doc_01 = { _id: 1000, created_date: new Date(2017-12-01), modified_date: new Date(2017-12-01), note_text: 'test 1000' },
          doc_02 = { _id: 1001, created_date: new Date(2017-12-02), modified_date: new Date(2017-12-02), note_text: 'test 1001' },
          doc_03 = { _id: 1002, created_date: new Date(2017-12-03), modified_date: new Date(2017-12-03), note_text: 'test 1002' };
      let docs = [doc_01, doc_02, doc_03];

      let test_result = noteView.viewNotes(docs);

      assert.ok(test_result instanceof Array);
      // assert.equal(test_result.length, 3);
    });

    it('should return an array that contains created_date fields', function() {
      let test_date = new Date(2017-12-01);
      let doc_01 = { _id: 1000, created_date: new Date(2017-12-01), modified_date: new Date(2017-12-01), note_text: 'test 1000' },
          doc_02 = { _id: 1001, created_date: new Date(2017-12-02), modified_date: new Date(2017-12-02), note_text: 'test 1001' },
          doc_03 = { _id: 1002, created_date: new Date(2017-12-03), modified_date: new Date(2017-12-03), note_text: 'test 1002' };
      let docs = [doc_01, doc_02, doc_03];

      let test_result = noteView.viewNotes(docs);

      assert.deepEqual(test_result[0].created_date, test_date);
    });

    it('should return an array that contains modified_date fields', function() {
      let test_date = new Date(2017-12-01);
      let doc_01 = { _id: 1000, created_date: new Date(2017-12-01), modified_date: new Date(2017-12-01), note_text: 'test 1000' },
          doc_02 = { _id: 1001, created_date: new Date(2017-12-02), modified_date: new Date(2017-12-02), note_text: 'test 1001' },
          doc_03 = { _id: 1002, created_date: new Date(2017-12-03), modified_date: new Date(2017-12-03), note_text: 'test 1002' };
      let docs = [doc_01, doc_02, doc_03];

      let test_result = noteView.viewNotes(docs);

      assert.deepEqual(test_result[0].modified_date, test_date);
    });

    it('should return an array with note_text fields', function() {
      let test_text = "How now brown cow?"
      let doc_01 = { _id: 1000, created_date: new Date(2017-12-01), modified_date: new Date(2017-12-01), note_text: test_text },
          doc_02 = { _id: 1001, created_date: new Date(2017-12-02), modified_date: new Date(2017-12-02), note_text: 'test 1001' },
          doc_03 = { _id: 1002, created_date: new Date(2017-12-03), modified_date: new Date(2017-12-03), note_text: 'test 1002' };
      let docs = [doc_01, doc_02, doc_03];

      let test_result = noteView.viewNotes(docs);

      assert.deepEqual(test_result[0].note_text, test_text);
    });


  });
});

