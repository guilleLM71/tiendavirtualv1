import axios from "axios";
import { initializeApp } from "firebase/app";
import {  GoogleAuthProvider,getAuth,
signInWithPopup,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
} from "firebase/auth";
import {
 getFirestore,
 query,
getDocs,
  collection,
 where,
 addDoc,
 } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyBTHMcCMZPNRZ0JZlwjytWo5JcNJdY4Bz8",
    authDomain: "tiendavirtual-228b5.firebaseapp.com",
    projectId: "tiendavirtual-228b5",
    storageBucket: "tiendavirtual-228b5.appspot.com",
    messagingSenderId: "586401660582",
    appId: "1:586401660582:web:21e14c792e76bec2413e67",
    
  };

  const app=initializeApp(firebaseConfig)
  const auth = getAuth(app);
  const db = getFirestore(app);

  const registro= async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await axios.post("http://localhost:4000/api/auth", {
        uid: user.uid,
        email,
        rol: "usuario" 
      }
      ,{
        headers: { 'Content-aplication': 'application/json'}
      }
      
      );



    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const login = async (email, password) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password)
      //console.log('data :>> ', data);
      /*
      .then((res) => {
        console.log('auth :>> ', res);
        
      });*/
      return data
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  export {auth,db, registro,login}