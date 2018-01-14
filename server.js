(function() {
  'use strict';

  const express    = require('express'),
        app        = express(),
        port       = process.env.PORT || 3000,
        noteCtrl   = require('./controllers/note.ctrl'),
        MongoClient = require('mongodb').MongoClient,
        assert = require('assert'),
        bodyParser = require('body-parser'),
        pug = require('pug');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logError);

  function logError(err, req, res, next) {
    console.log('Error: ', err.stack);
    res.status(500).send('Something broke...');
  }

  app.use(express.static(__dirname + '/public'));

  const compiledPug = pug.compileFile('./templates/displayNotes.pug');

  MongoClient.connect('mongodb://localhost:27017/nib', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    // ROUTES
    app.post('/', function(req, res) {
      noteCtrl.postNote(req, res, db);
      res.redirect('/'); // reload index.html
    })
    
    app.get('/get', function(req, res) {
      noteCtrl.getAllNotes(req, res, db, function(docs) {
        let output = '<h3>'
        for(var index = 0; index < docs.length; index++) {
          output += JSON.stringify(docs[index]);
        }
        output += '</h3>';
          
        res.send(output);
      });
    });

    app.get('/pug', function(req, res) {
      let temp = compiledPug({ name: 'P Dawg' });
      res.send(temp);
    });

    // START SERVER
    app.listen(port, function (){
      console.log('Server is listening to %d port in %s mode',port,app.settings.env);
    });

  });

}())
