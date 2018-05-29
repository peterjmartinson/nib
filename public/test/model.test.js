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
  }
];

let model = new Model(db);

describe('findById()', function() {

  it("should exist", function() {
    assert.equal(typeof model.findById, "function");
  });

  it("should take a callback", function() {
    model.findById("1000", function(error, data) {
      assert.ok(true);
    });
  });

  it('should return a note object', function() {
    let test_id = "1000";
    let expected_note = 'Test Note 1000';

    model.findById(test_id, function(error, data) {
      assert.equal(data.note_text, expected_note);
    });
  });

  it('should return 404 if a note doesn\'t exist', function() {
    let test_id = "1002";
    let expected_error = 404;

    model.findById(test_id, function(error, data) {
      assert.equal(error, expected_error);
    });
  });
      
});

describe('findAll()', function() {
// Should return an array of note objects
// Should return an empty array if there are no notes

  it("should exist", function() {
    assert.equal(typeof model.findAll, "function");
  });

  it("should take a callback", function(done) {
    model.findAll(function(error, data) {
      assert.ok(true);
      done();
    });
  });

  it('should return an array', function(done) {
    model.findAll(function(error, data) {
      assert.ok(data instanceof Array);
      done();
    });
  });

  it('should return an array of note objects', function(done) {
    let expected_length = 2; // The number of notes in the test array
    model.findAll(function(error, data) {
      assert.equal(data.length, 2); 
      done();
    });
    
  });




});
