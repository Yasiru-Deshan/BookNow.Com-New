import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'




function TheatreDropdownMenu(props) {

    
  const submitHandler  = async(e)=>{
      let update;

      e.preventDefault()
      const updatedMovie = {
        show1: props.title
        // show2: props.show2,
        // show3: props.show3
  
      }

      try{
        update = await axios.put(`http://localhost:8070/api/theatre/${props.id}`,updatedMovie)

         if (update){
       window.alert("Movie has been updated")
  }
      }catch(err){
        console.log(err)
      }
    }


    return (
        <div>
             <Dropdown.Item  onClick={submitHandler}>{props.title}</Dropdown.Item>
        </div>
    )
}

export default TheatreDropdownMenu