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

    model.findById("1000", function(error, data) {
      assert.equal(data.note_text, expected_note);
    });
  });
      
});
