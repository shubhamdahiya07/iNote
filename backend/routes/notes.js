const express = require('express');
const { validationResult, body } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router();

//Route 1:fetch all notes using:GET "/api/notes/fetchallnotes" :require login
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        //find notes using userId
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
})

//Route 2:create a note using:POST "/api/notes/addnote": requires login
router.post('/addnote', fetchuser, [

    body('title', "title can't be empty").isLength({ min: 1 }),
    body('Description', "description can't be empty").isLength({ min: 1 })

], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //creating a note
        let note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            Description: req.body.Description,
            tag: req.body.tag
        })

        res.json(note);
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
})

//Route 3:update an existing note using:PUT "/api/notes/updatenote" :require login
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, Description, tag } = req.body;
        //creating a new note with updated data
        let newNote = {};
        if (title) { newNote.title = title };
        if (Description) { newNote.Description = Description };
        if (tag) { newNote.tag = tag };

        //finding not with id provide in parameter of url
        let note = await Notes.findById(req.params.id);
        //if we don't find the note
        if (!note) {
            return res.status(404).send("Not Found");
        }
        //checking if the person sending the req and the author of note is same or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Authorized");
        }
        //update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
}
)

//Route 4:delete an existing note using:DELETE "/api/notes/deletenote" :require login
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //finding not with id provide in parameter of url
        let note = await Notes.findById(req.params.id);
        //if we don't find the note
        if (!note) {
            return res.status(404).send("Not Found");
        }
        //checking if the person sending the req and the author of note is same or not
        if (req.user.id !== note.user.toString()) { return res.status(401).send("Not Authorized") }
        //delete the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.send("Deleted Successfully");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
})

module.exports = router