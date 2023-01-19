// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAcRd8gFR-CAcbcqkOBO4-BytdSLy53L_k",
    authDomain: "prueba2-84949.firebaseapp.com",
    projectId: "prueba2-84949",
    storageBucket: "prueba2-84949.appspot.com",
    messagingSenderId: "137149174338",
    appId: "1:137149174338:web:76cbec7e19dfacac2b13db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
export default app

/*  
    apiKey: "AIzaSyDEqFsWocfMvTmnMr9YAzNxJlIvcrUvIxQ",
    authDomain: "gdr-productos-79516.firebaseapp.com",
    projectId: "gdr-productos-79516",
    storageBucket: "gdr-productos-79516.appspot.com",
    messagingSenderId: "713144556798",
    appId: "1:713144556798:web:aeb8a1bd93ccc013bcd9af"
    
    apiKey: "AIzaSyA5EaxYeeAd_elFDish_HVV4HoJyO_j85s",
    authDomain: "gdr-productos.firebaseapp.com",
    projectId: "gdr-productos",
    storageBucket: "gdr-productos.appspot.com",
    messagingSenderId: "305009820122",
    appId: "1:305009820122:web:bd88295feb56d3b0be40e3"
    
    apiKey: "AIzaSyAcRd8gFR-CAcbcqkOBO4-BytdSLy53L_k",
    authDomain: "prueba2-84949.firebaseapp.com",
    projectId: "prueba2-84949",
    storageBucket: "prueba2-84949.appspot.com",
    messagingSenderId: "137149174338",
    appId: "1:137149174338:web:76cbec7e19dfacac2b13db"
    
    
    
    
    
    
    
    
    */