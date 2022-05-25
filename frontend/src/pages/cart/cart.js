import React,{useState, useEffect} from 'react';
import { CartContainer,TableWrapper } from './../../components/InfoSection/InfoElements';
import { TableCard } from '../../components/Advertisements/Advertisements-styles';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Cart({lightBg}) {

  const [cart,setCart] = useState([]);

   useEffect(() => {

    const getCart = () => {
      axios.get('http://localhost:8070/api/cart/allbookings').then((res) => {
        setCart(res.data);
        
      })
    }

    getCart();
  }, [])

  const deleteBooking = async (id) => {
    let deletion;
    

    if (window.confirm(`Are you sure you want to cancel this reservation?`)) {
      deletion = await axios.delete(`http://localhost:8070/api/cart/delete/${id}`);
    }
  
  if (deletion){
       window.alert(`reservation has been canceled`)
  }
  }

    return( 

        <div>
        <div style={{
   /* Chrome 10-25, Safari 5.1-6 */
                          background: 'linear-gradient(to right, #240b36, #c31432)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }}>

            

              <CartContainer >

                

                    <TableWrapper >
                    <h1 style={{marginTop:'100px',
                                color: 'white',
                                display: 'flex',  justifyContent:'center', alignItems:'center',
                    }}><span>My Cart </span>&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-cart-fill" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg></h1>
                      <TableCard style={{margin: '50px 50px 50px 50px'}}>
                       <table className='table'>
                    
                       <thead>
                       
                         <tr>
                          <th>Movie</th>
                          <th>Theatre</th>
                          <th>Tickets Quantity</th>
                          <th>Time</th>
                          <th>Checkout</th>
                          <th></th>
                                                    
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map(c => (
                        <tr>
                          <td>{c.movieName}</td>
                          <td>{c.theatreName}</td>
                          <td>{c.tickets}</td>
                          <td>{c.time}</td>
                          <td><Link to={`/payment`}><Button>Checkout</Button></Link></td>        
                          <td><Button onClick={() => deleteBooking(c._id)}>Cancel Reservation</Button></td>                
                        </tr>
                        ))}
  
                       </tbody>
                     </table>
                    </TableCard>
                   </TableWrapper> 
                  </CartContainer> 
        </div>
</div>
    )

}

export default Cart;