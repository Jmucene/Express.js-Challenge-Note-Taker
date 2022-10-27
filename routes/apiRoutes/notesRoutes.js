const router = require('express').Router();
const notePadApi = require('../../db/db.json');
const fs = require("fs")
const {v4: uuidv4} = require('uuid');





// get the all the notes from the db.json file provided
router.get('/notes', (req, res) =>{
    let results = notePadApi;
    res.json(results);
});

// get specific note fromt he notes array
router.delete('/notes/:id', (req, res) =>{
    const idToDelete = req.params.id;

    notePadApi.forEach((obj, index) => {
        if(obj.id == idToDelete){
            notePadApi.splice(index, 1)
        }
    })

    fs.writeFileSync("./db/db.json", JSON.stringify(notePadApi));

    res.json(notePadApi);
});


// Post new note to the api
router.post('/notes', (req,res) => {
    
    const newNote = req.body;
    newNote.id = uuidv4();
    // console.log(newNote);

    notePadApi.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notePadApi));
    // push new item to new array
    res.json(notePadApi);
});


module.exports = router;