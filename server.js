(function() {
  "use strict";

  const express    = require("express"),
        app        = express(),
        port       = process.env.PORT || 3001,
        noteCtrl   = require("./src/controllers/note.ctrl"),
        MongoClient = require("mongodb").MongoClient,
        assert = require("assert"),
        bodyParser = require("body-parser"),
        pug = require("pug");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logError);
  app.set("views", "./views");
  app.set("view engine", "pug");

  function logError(err, req, res, next) {
    console.log("Error: ", err.stack);
    res.status(500).send("Something broke...");
  }

  app.use(express.static(__dirname + "/public"));

  MongoClient.connect("mongodb://localhost:27017", function(err, client) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    const db = client.db("nib");

    // ROUTES
    app.post("/", function(req, res) {
      noteCtrl.postNote(req, res, db);
      res.redirect("/"); // reload index.html
    })
    
    app.get("/get", function(req, res) {
      noteCtrl.getAllNotes(req, res, db, function(docs) {
        let render_object = {
          title: "Nib | Contents",
          message: "Contents of the nib database",
          docs: docs
        };
        res.render("displayNotes", render_object);
      });
    });

    app.get("/get/:id", function(req, res) {
      noteCtrl.getOneNote(req, res, db, function(doc) {
        console.log(doc);
        res.send(doc);
      });
    });

    app.get("/test", function(req, res) {
      res.send("/test/index");
      // let render_object = {
      //   title: "Testing...",
      //   id_list: [1, 2, 3, 4, 5, 6, 7]
      // };
      // res.render("test", render_object);
      // res.redirect("/onclick.html");
    });

    // START SERVER
    app.listen(port, function (){
      console.log("Server is listening to %d port in %s mode",port,app.settings.env);
    });

  });

}())
