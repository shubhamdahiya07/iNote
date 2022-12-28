import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const InitialNotes = [
        {
            "_id": "63a752e0cebc164a1350f0da0e",
            "user": "63a467ea6123ad6166eab258",
            "title": "My Journey",
            "Description": "to Wonderland",
            "tag": "Fictional",
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
        }, {
            "_id": "63a7521e0cexb164a350f0da0e",
            "user": "63a467ea6123ad6166eab258",
            "title": "My Journey",
            "Description": "to Wonderland",
            "tag": "Fictional",
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
        }, {
            "_id": "63a752e0cebl164a350f01da0e",
            "user": "63a467ea6123ad6166eab258",
            "title": "My Journey",
            "Description": "to Wonderland",
            "tag": "Fictional",
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
        }, {
            "_id": "63a7521e0cekb164a350f0da0e",
            "user": "63a467ea6123ad6166eab258",
            "title": "My Journey",
            "Description": "to Wonderland",
            "tag": "Fictional",
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
        }, {
            "_id": "63a752e0ceb16b4a350f0da10e",
            "user": "63a467ea6123ad6166eab258",
            "title": "My Journey",
            "Description": "to Wonderland",
            "tag": "Fictional",
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(InitialNotes);

    //Add a note
    const addnote = (title,description,tag) =>{
    const note = {
            "_id": "613a752e0ceb164a3h50f0da0e",
            "user": "63a467ea6123ad6166eab258",
            "title": title,
            "Description": description,
            "tag": tag,
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
    };
    setNotes(notes.concat(note))
}

    //delete a note 
    const deletenote = (id) =>{
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes ,addnote ,deletenote ,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;