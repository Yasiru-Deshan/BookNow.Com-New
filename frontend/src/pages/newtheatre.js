import React,{ useRef} from 'react';
import { CartContainer,TableWrapper } from './../components/InfoSection/InfoElements';
import './favorites/favorites.css';
import axios from 'axios';

function NewTheatre() {

      //let [search, setSearch] = useState("");

      const name = useRef();
      const city = useRef();
      const email = useRef();
      const mobile = useRef();
      

      const submitHandler = async (e)=>{
       e.preventDefault()
       let newm;

       const NewTheatre = {
           name : name.current.value,
           city : city.current.value,
           email : email.current.value,
           mobile : mobile.current.value,
          
       }

       try{
           newm = await axios.post("http://localhost:8070/api/theatre",NewTheatre)
           if(newm){
               window.alert("Theatre has been added")
           }
       }catch(err){
           console.log(err)
       }
   }

    return( 

        <div>
        <div style={{
   /* Chrome 10-25, Safari 5.1-6 */
                          background: 'linear-gradient(to right, #240b36, #c31432)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }}>


              <CartContainer  >

                    <TableWrapper>

                    
               <h1 style={{     marginTop:'100px',
                                color: 'white',
                                display: 'flex',  justifyContent:'center', alignItems:'center',
                    }}><span>New Theatre </span>&nbsp;
                       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-camera-reels" viewBox="0 0 16 16">
  <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
  <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
  <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg></h1>

<form onSubmit={submitHandler}>

   <div className="form-group">
    <label for="name">Theatre Name</label>
    <input className="form-control" type="text" placeholder="Enter Theatre Name" ref={name}/>
  </div>

    <div className="form-group">
    <label for="city">City</label>
    <input className="form-control" type="text" placeholder="Enter City Name" ref={city}/>
  </div>

  <div className="form-group">
    <label for="email">E-mail</label>
    <input type="email" className="form-control" placeholder="Enter E mail" ref={email}/>
  </div>
 <div className="form-group">
    <label for="description">Contact Number</label>
    <input type="" className="form-control" id="description" placeholder="Enter Mobile Number" ref={mobile}/>
  </div>

        <button type="submit" className="btn btn-primary" style={{width:'290px'}}>Add</button>
    
</form>
                   </TableWrapper> 
                  </CartContainer> 
        </div>
</div>
    )

}

export default NewTheatre;