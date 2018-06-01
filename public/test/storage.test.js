


describe('Storage', function() {

  let db = [{
    "_id": "1000",
    "note_text": "Test Note 1000",
    "created_date": "2017-12-01T19:34:14.565Z",
    "modified_date": "",
    "title": "Test Title 1000"
    },
    {
    "_id": "1001",
    "note_text": "Test Note 1001",
    "created_date": "2017-13-01T19:34:14.565Z",
    "modified_date": "",
    "title": "Test Title 1001"
    },
    {
    "_id": "1001",
    "note_text": "Alternate Test Note 1001",
    "created_date": "2017-13-01T19:34:14.565Z",
    "modified_date": "",
    "title": "Test Title 1001"
    }
  ];

  let store = new Storage(db);

  describe('findOneById()', function() {
    it('should exist', function() {
      assert.equal(typeof store.findOneById, 'function');
    });

    it("should take a callback", function(done) {
      store.findOneById("1000", function(error, data) {
        assert.ok(true);
        done();
      });
    });

    it('should return a note object', function() {
      let test_id = "1000";
      let expected_note = 'Test Note 1000';
      store.findOneById(test_id, function(error, data) {
        assert.equal(data.note_text, expected_note);
      });
    });

    it('should return 404 if a note doesn\'t exist', function() {
      let test_id = "1002";
      let expected_error = 404;
      store.findOneById(test_id, function(error, data) {
        assert.equal(error, expected_error);
      });
    });

    it('should only return one note object', function() {
      let test_id = "1001";
      let expected_note = 'Test Note 1001';
      store.findOneById(test_id, function(error, data) {
        assert.equal(data.note_text, expected_note);
      });
    });

  });

});
