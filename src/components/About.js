import React,{useContext, useEffect} from 'react'
import NoteContext from '../contexts/notes/NoteContext'
const About = () => {
  const a = useContext(NoteContext)
  useEffect(()=>{
    a.update();
    // eslint-disable-next-line
  },[])
  return (
    <div>
      this is about {a.state.name} of class {a.state.class}
    </div>
  )
}

export default About
