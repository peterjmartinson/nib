

describe('View', function() {

  // ============================================  Setup
  let controller = {
    test_data : '',
    setTestData: function(new_data) {
      this.test_data = new_data;
    },
    getTestData: function() {
      return this.test_data;
    },
    test_error : '',
    setTestError: function(new_error) {
      this.test_error = new_error;
    },
    getTestError: function() {
      return this.test_error;
    }
  };

  let view = new View(controller);

  // ============================================  Tests
  describe('editExistingNote()', function() {

    it('should exist', function() {
      assert.equal(typeof view.editExistingNote, 'function');
    });

    it('should call ctrl.editExistingNote()', function() {
      controller.editExistingNote = function(arg, callback)
      {
        this.setTestData('alligators');
        let data = this.getTestData();
        let error = this.getTestError();
        callback(error, data);
      }
      view.editExistingNote('1000');

      assert.equal(controller.getTestData(), 'alligators');
    });

  });

  describe('displayNote()', function() {

    it('should exist', function() {
      assert.equal(typeof view.displayNote, 'function');
    });

    it('should stick the note text into the page', function() {
      let note = 'Test Note 1001';
      let expected_note_text = 'Test Note 1001';
      view.displayNote(note);
      assert.equal(expected_note_text, document.getElementById('edit-note').value);
    });

  });

});
