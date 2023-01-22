import React, { useContext } from 'react'
import NoteContext from '../contexts/notes/NoteContext';
const Alert = (props) => {
    let context = useContext(NoteContext);
const {message} = context;
    return (
        
        <div>
            {(message!==null)&&<div className="my-5 alert alert-primary" role="alert">
                    {message}
            </div>}
        </div>
    )
}

export default Alert
