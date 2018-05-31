window.notes = [
  {
    "_id": "01",
    "note_text": "
    
    What happens when you click on a note?
    1. button/link sends the element id (i.e. note._id) to the click handler (controller?  view?)
    2. The note display routine first sends the ID to a routine that actually retreives the note (model?)
    3. The find note routine sends some appropriate query to the data layer (model? storage?)
    4. The data layer sends the entire note contents back to the 'find note' routine (model? storage?)
    5. The find note routine sends the note contents to the display routine (controller? view?)
    6. The display routine formats the note contents into whatever the end display requires
    7. The display routine sends the formatted note contents into the <textarea>
    8. The display routine sets the ID of the currently edited note

    *click*
    -> View (do something with the click)
      view.editExistingNote(id) - called directly from index.html
      inside editExistingNote:
      1. highlight the selected note <li>
      2. pass the ID to the controller
    -> Controller (send the ID to the model)
      ctrl.editExistingNote(id)
      inside editExistingNote:
      1. pass the ID to the model
      2. catch the resulting record in a callback
      3. send the note to view.displayEditedNote()
    -> Model (send the ID in a query to the data store)
      model.getOneNote(id)
      inside getOneNote:
      1. pass the ID to storage.findOneById()
      2. catch the resulting record in a callback
      3. send the record back to ctrl.editExistingNote()
    -> Storage (retrieve the record, send back to Model)
      store.findOneById(id)
      inside findOneById:
      1. either get a record from the storage array, or use Ajax to get it from the server database
      2. catch record in a callback
      3. send record back to model.getOneNote()
    -> Model (send the record to the controller)
      model.displayEditedNote(record)
      inside displayEditedNote:
      1. deal with a nonexistent note
      2. pass the note text into the <textarea>
      3. update edited_note_id, or some relatively global ID flag
    
    
    ",
    "created_date": "2017-12-01T19:34:14.565Z",
    "modified_date": "",
    "title": "Title 01"
  },
  {
    "_id": "02",
    "note_text": "Text of note 02",
    "created_date": "2027-12-02T19:34:14.565Z",
    "modified_date": "",
    "title": "Title 02"
  },
  {
    "_id": "03",
    "note_text": "Text of note 03",
    "created_date": "2037-12-03T19:34:14.565Z",
    "modified_date": "",
    "title": "Title 03"
  },
  {
    "_id": "04",
    "note_text": "Text of note 04",
    "created_date": "2047-12-04T19:34:14.565Z",
    "modified_date": "",
    "title": "Title 04"
  },
  {
    "_id": "05",
    "note_text": "Text of note 05",
    "created_date": "2057-12-05T19:34:14.565Z",
    "modified_date": "",
    "title": "Title 05"
  },
  {
    "_id": "06",
    "note_text": "Text of note 06",
    "created_date": "2067-12-06T19:34:14.565Z",
    "modified_date": "",
    "title": "Title 06"
  },
  {
    "_id": "07",
    "note_text": "Text of note 07",
    "created_date": "2077-12-07T19:34:14.565Z",
    "modified_date": "",
    "title": "Title 07"
  },
  {
    "_id": "08",
    "note_text": "Text of note 08",
    "created_date": "2087-12-08T19:34:14.565Z",
    "modified_date": "",
    "title": "Title 08"
  },
  {
    "_id": "09",
    "note_text": "Text of note 09",
    "created_date": "2097-12-09T19:34:14.565Z",
    "modified_date": "",
    "title": "Title 09"
  },
];
