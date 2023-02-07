const { db } = require("../src/firebase");
import { json } from "express";
import { collection, doc, getDoc, addDoc,getDocs,setDoc} from "firebase/firestore";


export const nuevousuario=async (req, res) => {
    
  const { uid,email,rol} = req.body;
  console.log('req.body :>> ', req.body);
  const docuRef = await doc(db, `usuarios/${uid}`);
  setDoc(docuRef, { email: email, rol: rol });
  res.json("usuario successfully")
};
export const getRol=async (req,res) => {
    const {uid}=req.body
    console.log('req.body :>> ', req.body);
    const docuRef = doc(db, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return res.json({infoFinal});
  }