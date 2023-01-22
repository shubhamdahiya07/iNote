import React, { useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../contexts/notes/NoteContext'

const AddNote = () => {
    //created a new {note} state
    const [note,setNote]=useState({title:"", Description:"", tag:""});

    const context = useContext(NoteContext);
    const {addnote} = context;

    const handleClick = (e) =>{
            e.preventDefault();
            addnote(note.title,note.Description,note.tag);
            setNote({ title: "", Description: "", tag: "" ,_id:""});

    }
    const onChange = (e) =>{
            setNote({...note, [e.target.name]:e.target.value});
    }
    return (
        <div>
            <div className="container my-3">
                <h1>Add A Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" value={note.title} className="form-control" name='title' id="title" aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        <input type="text" value={note.Description} className="form-control" id="Description" name='Description' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    <button disabled={note.title.length<5||note.Description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
