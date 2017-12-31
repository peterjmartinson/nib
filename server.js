(function() {
  'use strict';

  const express    = require('express'),
        app        = express(),
        port       = process.env.PORT || 3000,
        noteCtrl   = require('./controllers/note.ctrl'),
        MongoClient = require('mongodb').MongoClient,
        assert = require('assert'),
        bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logError);

  function logError(err, req, res, next) {
    console.log('Error: ', err.stack);
    res.status(500).send('Something broke...');
  }

  app.use(express.static(__dirname + '/public'));

  MongoClient.connect('mongodb://localhost:27017/nib', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    // ROUTES
    app.post('/', function(req, res) {
      noteCtrl.postNote(req, res, db, console.log);
      res.redirect('/'); // reload index.html
    })

    // START SERVER
    app.listen(port, function (){
      console.log('Server is listening to %d port in %s mode',port,app.settings.env);
    });

  });

}())
