import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    trailer_id: '',
    title: '',
    price: 0,
    description: 'Type your movie description here',
    content: 'Type you movie content here',
    category: '',
    _id:''
  
}
function CreateTrailer() {
    const state = useContext(GlobalState)
    const [trailer, setTrailer] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const [isArtist] =state.userAPI.isArtist
    const [token] = state.token

    const history = useHistory()
    const param = useParams()
    
    const [trailers, setTrailers] = state.trailersAPI.trailers
    const [onEdit, setOnEdit] =useState(false)
    const [callback, setCallback] = state.trailersAPI.callback


    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            trailers.forEach(trailer => {
                if(trailer._id === param.id){
                    setTrailer(trailer)
                    setImages(trailer.images)
                } 
            })
            setOnEdit(true)
        }else{setTrailer(initialState)
        setImages(false)
        setTrailer(initialState)
        setImages(false)
    }
    }, [param.id, trailers])
       

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isArtist) return alert("You are not an artist.")
            const file = e.target.files[0]

            if(!file) return alert("File not exist.")

            if(!file.size > 2048*2048)
             return alert("Size too large")

             if(file.type !== 'image/jpeg'  && file.type !== 'image/png') 
             return alert("File format is incorrect")

             let formData = new FormData()
             formData.append('file' , file)

             setLoading(true)
             const res = await axios.post('/api/upload', formData, {
                 headers: {'content-type': 'multipart/form-data', Authorization: token}
             })
           setLoading(false)
           setImages(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleDestroy= async e =>{
        try {
            if(!isArtist) return alert("You are not an artist")
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token }
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
   const handleChangeInput = e =>{
       const{name, value} = e.target
       setTrailer({...trailer, [name]:value})
}
const handleSubmit =async  e =>{
    e.preventDefault()
    try {
        if(!isArtist) return alert("You are not an admin")
        if(!images) return alert ("No image upload")

        if(onEdit){
            await axios.put(`/api/trailers/${trailer._id}`, {...trailer, images}, {
                headers: {Authorization: token}
                
        })
    }else{
        await axios.post('/api/trailers', {...trailer, images}, {
            headers: {Authorization: token}
       })
        
        }
        setCallback(!callback)
       // setImages(false)
       // setProduct(initialState)
        history.push("/")

        {
            alert("Successfully") 
        }
    } catch (err) {
        alert(err.response.data.mag)
    }
}
    const styleUpload ={
        display: images ? "block" : "none"
    }
    return (
        <div className="create_trailer">
        <div className="upload">
            <input type="file" name="file" id="file_up" onChange ={handleUpload}/>
          {
              loading ? <div id="file_img"><Loading /></div>
          
          :<div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ''} alt="" />
                    <span onClick={handleDestroy}>X</span>
           </div>
           }
           </div>

        <form onSubmit = {handleSubmit}>
            <div className="row">
                <label htmlFor="trailer_id">Movie ID</label>
                <input type="text" name="trailer_id" id="trailer_id" required
                value={trailer.trailer_id} onChange ={handleChangeInput} disabled={trailer._id} />
            </div>

            <div className="row">
                <label htmlFor="title">Movie Title</label>
                <input type="text" name="title" id="title" required
                value={trailer.title} onChange ={handleChangeInput}/>
            </div>
            

            <div className="row">
                <label htmlFor="price">Viewers</label>
                <input type="number" name="price" id="price" required
                value={trailer.price} onChange ={handleChangeInput}/>
            </div>

            <div className="row">
                <label htmlFor="description">Description</label>
                <textarea type="text" name="description" id="description" required
                value={trailer.description} rows="5"  onChange ={handleChangeInput}/>
            </div>

            <div className="row">
                <label htmlFor="content">Content</label>
                <textarea type="text" name="content" id="content" required
                value={trailer.content} rows="7" onChange ={handleChangeInput}/>
            </div>

            <div className="row">
                <label htmlFor="categories">Genre: </label>
                <select name="category" value={trailer.category} onChange ={handleChangeInput} >
                    <option value="">Please select a Genre</option>
                    {
                        categories.map(category => (
                            <option value={category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
 
            </div>
            <button type ="submit">{onEdit? "update": "Create"}</button>
                </form>
                <div>

                </div>
            </div>
           

    )
}

export default CreateTrailer
