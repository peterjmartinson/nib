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
  app.set('views', './views');
  app.set('view engine', 'pug');

  function logError(err, req, res, next) {
    console.log('Error: ', err.stack);
    res.status(500).send('Something broke...');
  }

  app.use(express.static(__dirname + '/public'));

  const compiledPug = pug.compileFile('./views/displayNotes.pug');

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

    app.get('/dbcontents', function(req, res) {
      noteCtrl.getAllNotes(req, res, db, function(docs) {
        let render_object = {
          title: 'nib | DB Contents',
          message: 'Contents of the nib database',
          docs: docs
        };
        res.render('displayNotes', render_object);
      });
    });

    function makeNoteDisplay(note) {
      let title = note.note_text.substring(0, indexOf('<br>'));
      let body = note.note_text;
      let created_date = note.created_date;
      return {
        title: title,
        body: body,
        created_date: created_date
      }
    }

    // START SERVER
    app.listen(port, function (){
      console.log('Server is listening to %d port in %s mode',port,app.settings.env);
    });

  });

}())
