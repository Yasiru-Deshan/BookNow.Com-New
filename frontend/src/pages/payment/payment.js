import React,{useState,useRef} from 'react';
import './payment.css';
import Paypal from './../../components/PayPal';
import emailjs from '@emailjs/browser';
import axios from "axios"

function Payment(lightBg){

    const [checkout,setCheckout] = useState(false)


    const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();

     emailjs.sendForm('gmail', 'template_67s2vgf', form.current, 'Y9lT8lCdNHyWRkDzlpNND')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
    }

     const cardHoldersName = useRef();
     const cvv = useRef();
     const email = useRef();
     const mobile = useRef();
     const cardNumber = useRef();
     const exMonth = useRef();
     const exYear = useRef();


      const submitHandler = async (e)=>{
       e.preventDefault()
       let newm;

       const newCard = {
           cardHoldersName: cardHoldersName.current.value,
           cardNumber: cardNumber.current.value,
           expireMonth: exMonth.current.value,
           expireYear: exYear.current.value,
           cvv: cvv.current.value,
           email: email.current.value,
           mobile: mobile.current.value,
          
       }

       try{
           newm = await axios.post("http://localhost:8070/api/creditcard/",newCard)
           if(newm){
               window.alert("Transaction Completed")
           }
       }catch(err){
           console.log(err)
       }
   }

    return(
        
        
          <div>
          {
            checkout ? (
                <Paypal/>
            ) : (
           <div style={{

   /* Chrome 10-25, Safari 5.1-6 */
                          background: 'linear-gradient(to right, #240b36, #c31432)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }}>

        .   <form ref={form} onSubmit={sendEmail}>
    <div className="callback d-flex flex-column align-items-center justify-content-center" >
        <div className="heading d-flex flex-column align-items-center justify-content-center"> 
            <p className="h-1">Contact Details</p>
           
        </div>
        
    </div></form>


<div className='container-fluid mt-5 mb-5 p-0' >
    <div className="inner row d-flex justify-content-center">
        <div className="creditcard col-md-5 col-12 box1">
            <div className="creditcard-content">
                <div className="creditcard-header">
                    <div className="heading mb-3"> PAYMENT METHOD </div>
                    <div className="sub-heading row text-center m-0">
                        {/* <div className="col-6 col-md-6 sub-heading1">By Credit Card</div> */}
                        <button className="col-6 col-md-6 sub-heading2"  onClick={()=>{
                                setCheckout(true);
                            }}>By PayPal</button>
                        <button className="col-6 col-md-6 sub-heading2">By Credit Card</button>
                    </div>
                </div>
                <div className="creditcard-body">
                    <p><small> You choose the method of payment with a credit card. Enter your paymentdetails or select another payment method </small></p>
                    <div className="credit d-block mt-5 mx-auto"> <img className="frnt" alt="" src="https://i.imgur.com/Lj98lDm.png" width="200px"/> <img alt="" className="back" src="https://i.imgur.com/HrUwtFC.png" width="200px"/> </div>
                </div>
            </div>
        </div>
        <div className="creditcard col-md-5 col-12 box2">
            <div className="creditcard-content">
                <div className="creditcard-header box2-head">
                    <div className="heading2"> PAYMENT DETAILS </div>
                </div>
                <div className="creditcard-body col-10 offset-1">
                    <form>
                        <div className="form-group"> <label><small><strong className="text-muted">CARD HOLDER</strong></small></label> <input className="form-control" placeholder="Devin Caldwell" ref={cardHoldersName}/> </div>
                        <div className="form-group"> <label><small><strong className="text-muted">CARD NUMBER</strong></small></label>
                            <div className="d-flex card-number"> <input className="form-control" placeholder="1234-4567-4543-1685" ref={cardNumber}/> <i className="fas fa-credit-card text-muted fa-2x"></i> </div>
                        </div>
                        <div className="line3">
                            <div className="txt d-flex">
                                <p><small className="text-muted">EXPERATION DATE</small></p>
                                <p><small className="text-muted">CVV</small></p>
                            </div>
                            <div className="form-group row"> <select className="form-control col-5" ref={exMonth}>
                                    <option>January</option>
                                    <option>February</option>
                                    <option>march</option>
                                    <option>April</option>
                                    <option>May</option>
                                    <option>June</option>
                                    <option>July</option>
                                    <option>August</option>
                                    <option>September</option>
                                    <option>October</option>
                                    <option>November</option>
                                    <option>December</option>
                                </select> <select className="form-control col-4" ref={exYear}>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                </select> <input className="col-3 col-md-2 offset-md-1 text-left" type="text" placeholder="234" ref={cvv}/> </div>
                        </div>
                        <div className="d-md-flex">
            <div className="row" style={{padding:'5px'}}>
                
                <div className="col-md-5 col-12 me-md-4"> <input className="form-control" type="text" name="user_email" placeholder="Your Email" ref={email}/> </div>
                <div className="col-md-5 col-12 ms-md-1"> <input className="form-control" type="text" placeholder="Phone No" ref={mobile}/> </div>
            </div>
       
        </div>
                    </form>
                </div>
                <div className="card-footer col-10 offset-1 border-0 footer2">
                    <div className="d-flex total mb-5">
                        <p><strong>TOTAL</strong></p>
                        <p><strong>Rs 4235</strong></p>
                    </div> <button className="btn col-12"
                            onClick={submitHandler}
                          > PAY </button>

                </div>
            </div>
        </div>
    </div>
</div>
.
        </div>
            )}
</div>
            
    )
                   
}

export default Payment;