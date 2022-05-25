import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../services/AuthService';
import Message from '../components/message';



const Register = props =>{
    const [user,setUser] = useState({username: "", password : "",role:""});
    const [message,setMessage] = useState(null);
    let timeID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timeID);
        }
    },[]); 

    const resetForm = () =>{
        setUser({username : "", password : "",role: ""});
    }

    const onChange = e =>{
      
        setUser({...user,[e.target.name] : e.target.value});

    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
           const { message } = data;
           setMessage(message);
           resetForm();
           if(!message.msgError){
              timeID = setTimeout(()=>{
                  props.history.push('/login');
              },2000)
           }
    })
    }

    return(
        <div className="container" style={{marginTop:"-150px"}}
        >
            <form onSubmit={onSubmit}>
                <h3>Sign Up</h3>
                <label htmlFor="username" className ="sr-only">Username: </label>
                <input type = "text"
                       name = "username"
                       onChange = {onChange}
                       className = "form-control"
                       placeholder = "Enter Username"/>
                <label htmlFor="password" classname="sr-only">Password: </label>  
                <input type = "text"
                       name = "password"
                       onChange = {onChange}
                       className = "form-control"
                       placeholder = "Enter Password"/>  
                <label htmlFor="role" classname="sr-only">Role: </label>  
                <input type = "text"
                       name = "role"
                       onChange = {onChange}
                       className = "form-control"
                       placeholder = "Enter Role"/>    
                <button className="btn btn-lg btn-primary btn-block"
                        type = "submit">Register</button>      
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Register;