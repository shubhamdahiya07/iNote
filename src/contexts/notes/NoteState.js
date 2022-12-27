import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const InitialNotes = [
        {
            "_id": "63a752e0ceb164a350f0da0e",
            "user": "63a467ea6123ad6166eab258",
            "title": "My Journey",
            "Description": "to Wonderland",
            "tag": "Fictional",
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
        }, {
            "_id": "63a752e0ceb164a350f0da0e",
            "user": "63a467ea6123ad6166eab258",
            "title": "My Journey",
            "Description": "to Wonderland",
            "tag": "Fictional",
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
        }, {
            "_id": "63a752e0ceb164a350f0da0e",
            "user": "63a467ea6123ad6166eab258",
            "title": "My Journey",
            "Description": "to Wonderland",
            "tag": "Fictional",
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
        }, {
            "_id": "63a752e0ceb164a350f0da0e",
            "user": "63a467ea6123ad6166eab258",
            "title": "My Journey",
            "Description": "to Wonderland",
            "tag": "Fictional",
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
        }, {
            "_id": "63a752e0ceb164a350f0da0e",
            "user": "63a467ea6123ad6166eab258",
            "title": "My Journey",
            "Description": "to Wonderland",
            "tag": "Fictional",
            "date": "2022-12-24T19:28:32.973Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(InitialNotes);
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;