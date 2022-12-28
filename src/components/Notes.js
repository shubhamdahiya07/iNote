import React from 'react'
import Noteitem from './Noteitem';
import { useContext } from 'react'
import NoteContext from '../contexts/notes/NoteContext'
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
    return (
        <div className='row my-3'>
            <AddNote/>
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note} />
            })}
        </div>
    )
}

export default Notes
