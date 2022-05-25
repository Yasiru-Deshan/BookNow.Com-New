import React, {useState, useContext, useEffect} from 'react';
import AuthService from '../services/AuthService';
import Message from '../components/message';
import {AuthContext} from '../context/AuthContext';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Login = props =>{
    const [user,setUser] = useState({username: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    const initialValues = {username:"",email:"",password:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false)

    const onChange = e =>{
        e.preventDefault();
        setUser({...user,[e.target.name] : e.target.value});
        console.log(user);
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            const{
                isAuthenticated,user,message
            } = data;
            if(isAuthenticated){
               authContext.setUser(user);
               authContext.setIsAuthenticated(isAuthenticated); 
               props.history.push('/home')
            }else
               setMessage(message);
        })
    }

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormValues({...formValues, [name]: value});

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(()=>{
        if(Object.keys(formErrors).length === 0 && isSubmit){
          console.log(formValues);
        }
    },[formErrors])



    const validate = (values) =>{
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.username){
            errors.username = "Username is Required";
        }
        if(!values.email){
            errors.email = "Email is Required";
        }else if(!regex.test(values.email)){
            errors.email = "This is not a valid email"
        }
        if(!values.password){
            errors.password = "Password is Required";
        }else if(values.password < 4){
            errors.password = "Password must have more than 4 characters "
        }

        return errors;
    }

    return(
        <div className="container" style={{marginTop:"-150px"}} >

         {Object.keys(formErrors).length === 0 && isSubmit ? (
           //  window.alert('Succesfully Signed In')
             
             <Link to='/'><button className="btn btn-primary" style={{
             float: 'right',
             marginTop: '330px',
             marginLeft:'-500px'
                             
                                 }}>Start Booking Now</button></Link>)
          : 
          <pre></pre>
          }


            
            <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="form-group">
            <label>Username</label>
            <input
            className='form-control'
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p style={{color:'red'}}>{formErrors.username}</p>
          <div className="form-group">
            <label>Email</label>
            <input
              className='form-control'
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p style={{color:'red'}}>{formErrors.email}</p>
          <div className="form-group">
            <label>Password</label>
            <input
            className='form-control'
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p style={{color:'red'}}>{formErrors.password}</p>
          <button className="btn btn-primary" style={{marginLeft: '200px'}}>Sign In</button>
        {/* <Link to='/'> <button style={{backgroundColor: 'white'}}></button></Link> */}
         
        </div>
      </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Login;