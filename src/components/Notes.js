import React from 'react'
import Noteitem from './Noteitem';
import { useContext } from 'react'
import NoteContext from '../contexts/notes/NoteContext'

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
    return (
        <div className='row my-3'>
            {notes.map((note) => {
                return <Noteitem note={note} />
            })}
        </div>
    )
}

export default Notes
