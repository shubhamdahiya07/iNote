import React from 'react'

const Noteitem = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.Description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
