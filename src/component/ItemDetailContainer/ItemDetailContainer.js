import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig"
import Loading from "../Loading/Loading"

const ItemDetailContainer =()=>{
    const [product, setProduct]= useState({})
    const [loading, setLoading]=useState(true)
    const { productId } = useParams()

    useEffect(()=>{
        const productRef=doc(db,'products', productId)
        getDoc(productRef)
            .then(response =>{
                const data = response.data()
                const productsAdapted={id: response.id, ...data}
                setProduct(productsAdapted)
            })
            .catch(error=>{
                console.log(error)
            })
            .finally(()=>{
                setLoading(false)
            })
    },[productId])
        if(loading){
            return (   
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <Loading/>
            </div>)
        }
    return(
        <div> 
            <ItemDetail {...product}/>
        </div>
    )
}
export default ItemDetailContainer