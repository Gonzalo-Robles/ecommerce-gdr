import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'
import { Button} from 'react-bootstrap'
import { collection, getDocs, query, where, documentId, writeBatch, addDoc,serverTimestamp } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
//import Loading from '../Loading/Loading'

//import Loading from '../Loading/Loading'

const Checkout = () => {
    const [confirmMessage, setConfirmMessage]= useState(false)
    const {cart, getTotal, clearCart } = useContext(CartContext)
    const [client,setClient]= useState([])
    const [lista, setLista] = useState([])
    const [codigo, setCodigo]=useState("")
    
    const handleChange = (e)=>{
        const {name,value} = e.target
        setClient({
            ...client,
            [name]:value
        })
    }


    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
  // funcion para renderizar la lista de usuarios
    useEffect(()=>{
        const getLista = async()=>{
            try {
                const querySnapshot = await getDocs(collection(db,'user'))
                const docs = []
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(), id: doc.id})
                })
                setLista(docs)
            } catch (error) {
                console.log(error);
            }
        }
        getLista();
    },[lista])

    const handleCreateOrder = async () => {
        setLoading(true)

        try {
            const objOrder = {
                buyer: {
                   client
                },
                items: cart,
                date:serverTimestamp(),
                total: getTotal()
            }
    
    
            const batch = writeBatch(db)
    
            const ids = cart.map(prod => prod.id)
            
            const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))
            const productsAddedToCartFromFirestore = await getDocs(productsRef)
    
            const { docs } = productsAddedToCartFromFirestore
            //guardo el producto que esta fuera de stock
            const outOfStock = []
    
            docs.forEach(doc => {
                const dataDoc = doc.data()
                //cuanto stock tengo en mi base de datos
                const stockDb = dataDoc.stock
    
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                //cuanto agrego el usario 
                const prodQuantity = productAddedToCart?.quantity
    
                if(stockDb >= prodQuantity) {
                    //puedo actualizar el stock
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    // mando el id del producto de los que estan fuera de stock
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })
            //si no tengo productos fuera de stock y tengo los datos de cliente...
            if(outOfStock.length === 0 && client.nombre && client.direccion && client.telefono && client.email) {
                await batch.commit()
                const orderRef = collection(db, 'orders')
                const orderAdded = await addDoc(orderRef, objOrder)
                                          
                .then(res => {
                    setConfirmMessage(true);
                    setCodigo(res.id);
                  })
                .catch(error => 
                    console.log("hubo un error!")
                  )
                         
                 console.log(orderAdded.id)
                
            } else {
                console.log('Productos fuera de stock o no cargados');
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
    }
        clearCart()
        setTimeout(() => {
            navigate('/')
        }, 5000) 
        
    } 

      if(loading) {
       
        return (
            <div style={{display: 'flex',  justifyContent:'center'}}>
            {<h2>Generando Orden...</h2>}

            </div>
        )
    }
    return (
        <div >
            <div style={{display: 'flex',  justifyContent:'center'}}>
    
            {confirmMessage && <h2>Compra exitosa!.Su codigo de compra es {codigo}</h2>}
            <br></br>
            </div>
            
            {!confirmMessage && <>
                <h1 >Checkout</h1>
            {
            cart.map(prod =>{
                const total = getTotal()
                return(
                    <div key={prod.id}>
                        <img src={prod.img}  alt={prod.id} style={{width:300}}/>
                        <h2>{prod.name} Unit x ( {prod.quantity} ) = ${prod.price * prod.quantity}</h2>                     
                        <h3> Total: ${total} </h3>
                    </div>
                )
            })
            }
            <h2 >Información Requerída para el Envío</h2>
                    <form  class="justify-content-center">
                        <div className="form-group"  >
                            <label htmlFor="nombre">Nombre</label>
                            <input value={client.nombre} name="nombre" className='form-control' type="text" id="nombre" onChange={handleChange} />
                            <label htmlFor="direccion">Direccion</label>
                            <input value={client.direccion} name="direccion" className='form-control' type="text" id="direccion" onChange={handleChange} />
                            <label htmlFor="telefono">Teléfono</label>
                            <input value={client.telefono} name="telefono" id="telefono" className='form-control' type="number" onChange={handleChange} />
                            <label htmlFor="email">Email</label>
                            <input value={client.email} name="email" id="email" type="email" className='form-control' onChange={handleChange} />
                        </div>
                    </form>
       
        <br></br>
            <Button onClick={handleCreateOrder}>Confirmar orden</Button>
        </>}
        </div>
    )
}

export default Checkout