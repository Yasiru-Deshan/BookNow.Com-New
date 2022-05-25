import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
//import PaypalButton from './PaypalButton'

function Favourite() {
    const state = useContext(GlobalState)
    const [favourite, setFavourite] = state.userAPI.favourite
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = favourite.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[favourite])

    const addToFavourite = async (favourite) =>{
        await axios.patch('/user/addfavourite', {favourite}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        favourite.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setFavourite([...favourite])
        addToFavourite(favourite)
    }

    const decrement = (id) =>{
        favourite.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setFavourite([...favourite])
        addToFavourite(favourite)
    }

    const removeTrailer = id =>{
        if(window.confirm("Do you want to delete this Advertiusement?")){
            favourite.forEach((item, index) => {
                if(item._id === id){
                    favourite.splice(index, 1)
                }
            })

            setFavourite([...favourite])
            addToFavourite(favourite)
        }
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {favourite, paymentID, address}, {
            headers: {Authorization: token}
        })

        setFavourite([])
        addToFavourite([])
        alert("You have successfully placed an order.")
    }


    if(favourite.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Favourites Empty</h2> 

    return (
        <div>
            {
               favourite.map(trailer => (
                    <div className="detail favourite" key={trailer._id}>
                        <img src={trailer.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{trailer.title}</h2>

                            <h3> {trailer.price}Viewers</h3>
                            <h3> {trailer.quantity}Like</h3>
                            
                            <p>{trailer.description}</p>
                            <p>{trailer.content}</p>

                            <div className="amount">
                                 <button onClick={() => decrement(trailer._id)}> UnLike </button>
                                <span>{trailer.quantity}</span>
                                 <button onClick={() => increment(trailer._id)}>Like </button>
                            </div>
                            
                            <div className="delete" 
                            onClick={() => removeTrailer(trailer._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

           {/*<div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton
                total={total}
                tranSuccess={tranSuccess} />
            </div>
        */}
        </div>
    )
}

export default Favourite

