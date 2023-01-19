import React, { useEffect, useState } from 'react'
//import firebaseApp from '../Credenciales/Credenciales'
import {getAuth, signOut} from 'firebase/auth'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'
import app from '../../services/firebase/firebaseConfig'

const auth = getAuth(app)
const db = getFirestore(app)


const Home = ({correoUsuario}) => {

    const valorInicial = {
        nombre:'',
        edad: '',
        telefono:'',
        domicilio:'',
        ciudad:''
    }

    const [user, setUser] = useState(valorInicial)
    const [lista, setLista] = useState([])
    const [subId, setSubId] = useState('')
 
    const capturarInputs = (e)=>{
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

    // funcion para guardar o actualizar 
    
    const guardarInfo = async(e)=>{
        e.preventDefault()
        // console.log(user);
        // si es vacio entonces guardamos
        if(subId === ''){
            try {
                await addDoc(collection(db,'user'),{
                    ...user
                })
            } catch (error) {
                console.log(error);
            }
        }
        else{
            await setDoc(doc(db, 'user', subId),{
                ...user
            })
        }
        

        setUser({...valorInicial})
        setSubId('')
    }

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

    // funcion para eliminar documentos
    const deleteUsuario = async(id)=>{
        await deleteDoc(doc(db, "user", id))
    }

    // las funciones para pedir un solo documento y luego almacenar

    const getOne = async(id) =>{
        try {
            const docRef = doc(db, 'user', id)
            const docSnap = await getDoc(docRef)
            setUser(docSnap.data())
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(subId !== ''){
            getOne(subId)
        }
    },[subId])

    return (
      <div className="container">
        <p>
          Bienvenido, <strong>{correoUsuario}</strong> Haz iniciado sesion{" "}
        </p>
        
        <button className="btn btn-primary" onClick={() => signOut(auth)}>
          Cerrar Sesion
        </button>
        <hr />

        {/* cuerpo de la app  */}

        <div className="row container">
          <div className="col-md-4">
            {/* aqui donde creamos el formulario */}
            <h2 className='text-center'>Crear Usuario</h2>
            <form onSubmit={guardarInfo}>
              <div className="card card-body">
                <div className="form-group">
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="ingresar el nombre del usuario"
                    onChange={capturarInputs}
                    value={user.nombre}
                  />
                </div>

                {/* segunda caja */}
                <div className="form-group">
                  <input
                    type="text"
                    name="edad"
                    className="form-control mt-2"
                    placeholder="ingresar la edad del usuario"
                    onChange={capturarInputs}
                    value={user.edad}
                  />
                </div>

                {/* tercer campo */}
                <div className="form-group">
                  <input
                    type="text"
                    name="telefono"
                    className="form-control mt-2 mb-3"
                    placeholder="ingresar el telefono del usuario"
                    onChange={capturarInputs}
                    value={user.telefono}
                  />
                </div>
                {/* cuarto campo */}
                <div className="form-group">
                  <input
                    type="text"
                    name="domicilio"
                    className="form-control mt-2 mb-3"
                    placeholder="ingresar domicilio "
                    onChange={capturarInputs}
                    value={user.domicilio}
                  />
                </div>
                {/* quinto campo */}
                <div className="form-group">
                  <input
                    type="text"
                    name="ciudad"
                    className="form-control mt-2 mb-3"
                    placeholder="ingresar la ciudad"
                    onChange={capturarInputs}
                    value={user.ciudad}
                  />
                </div>
                <button className='btn btn-primary'>
                    {subId === '' ? 'Guardar' : 'Actualizar'}
                </button>
              </div>
            </form>
          </div>

          <div className="col-md-8">
              <h2 className='text-center'>Datos de usuario</h2>
              <div className='container card'>
                <div className='card-body'>
                    {
                        lista.map(list => (
                            <div key={list.id}>
                                <p>Nombre: {list.nombre}</p>
                                <p>Edad: {list.edad}</p>
                                <p>Telefono:{list.telefono}</p>
                                <p>Domicilio: {list.domicilio}</p>
                                <p>Ciudad: {list.ciudad}</p>
                                <button className='btn btn-danger' onClick={()=>deleteUsuario(list.id)}>
                                    Eliminar
                                </button>
                                <button className='btn btn-success m-1'onClick={()=>setSubId(list.id)} >
                                    Actualizar
                                </button>
                                <hr />
                            </div>
                            
                        ))
                    }
                </div>
              </div>
          </div>
        </div>
      </div>
    );
}

export default Home