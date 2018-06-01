
describe('Controller', function() {
  let model = {
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

  let view = {};

  let ctrl = new Controller(model, view);

  describe('editExistingNote()', function() {

    // =================================================  Setup

    model.getOneNote = function(arg, callback)
    {
      let data = this.getTestData();
      let error = this.getTestError();
      callback(error, data);
    }

    // =================================================  Tests
    it('should exist', function() {
      assert.equal(typeof ctrl.editExistingNote, 'function');
    });

    it("should take a callback", function(done) {
      ctrl.editExistingNote("1000", function(error, data) {
        assert.ok(true);
        done();
      });
    });

    it('should call model.getOneNote()', function(done) {
      let test_data = 'called'
      let test_error = null;
      model.setTestData(test_data);
      model.setTestError(test_error);
      ctrl.editExistingNote("1000", function(error, data) {
        assert.equal(data, test_data);
        done();
      });
    });

    it('should pass any errors right through to model.getOneNote()', function(done) {
      let test_error = '404';
      let test_data = null;
      model.setTestData(test_data);
      model.setTestError(test_error);
      ctrl.editExistingNote('1000', function(error, data) {
        assert.equal(error, test_error);
        done();
      });
    });

    it('should only pass one object to model, not an array', function(done) {
      let test_error = null;
      let test_data = [
        {
          "_id": "01",
          "note_text": "Text of note 01",
          "created_date": "2017-12-01T19:34:14.565Z",
          "modified_date": "",
          "title": "Title 01"
        },
        {
          "_id": "01",
          "note_text": "Alternate Text of note 01",
          "created_date": "2017-12-01T19:34:14.565Z",
          "modified_date": "",
          "title": "Title 01"
        }
      ];
      model.setTestData(test_data);
      model.setTestError(test_error);
      ctrl.editExistingNote('01', function(error, data) {
        console.log(data);
        assert.deepEqual(data, test_data[0]);
        done();
      });
    });
    
      


  

  });

});
