import {useState, useEffect} from 'react'
//import { getProducts, getProductsByCategory } from '../../asyncMock'
import ItemList from '../ItemList.js/ItemList'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { getDocs,collection,query,where} from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'

const ItemListContainer =()=>{
    const[products, setProducts]=useState([])
    const{categoryId}=useParams()
    const[loading, setLoading]=useState(true)
    
    useEffect( ()=> {
        const productsRef=categoryId
        ? query(collection(db, 'products'), where ('category', '==', categoryId))
        : collection(db, 'products')
        getDocs(productsRef)
            .then(response => {
                const productsAdapted = response.docs.map(doc => {
                    const data=doc.data()
                    return {id: doc.id, ...data}
                })

                setProducts(productsAdapted)
            })
        

            .catch(error =>{
                console.log(error)
            })

            .finally(() => {
                setLoading(false)
            })
        
 
    }, [categoryId])

    if(loading){
        return (
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <Loading/>
        </div>
        )
    }

    return(
        <div>     
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer 