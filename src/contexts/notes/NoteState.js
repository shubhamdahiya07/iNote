import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000/';
    const InitialNotes = [];
    const [notes, setNotes] = useState(InitialNotes);
    const [message,setMessage] = useState("");

    //Get Notes
    async function getNotes() {
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    //Add a note
    const addnote = async (title, Description, tag) => {
        const response = await fetch(`${host}api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, Description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
        setMessage("Note added successfully");
    }

    //delete a note 
    const deletenote = async(id) => {
        const response = await fetch(`${host}api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify()
        });
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
        console.log(response);
        setMessage("Note deleted successfully");
    }

    //updatenote
    const updatenote = async (title, Description, tag, id) => {
        // eslint-disable-next-line no-unused-vars
        const response = await fetch(`${host}api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, Description, tag })
        });
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id)
            {
                element.title=title;
                element.Description=Description;
                element.tag=tag;
                break;
            }
        }
        setNotes(newNotes);
        setMessage("Note updated successfully");
    }

    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, setNotes, updatenote, getNotes, message , setMessage}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;