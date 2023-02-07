const { db } = require("../src/firebase");
import { json } from "express";
import { collection, addDoc,getDocs, doc, deleteDoc,getDoc,setDoc} from "firebase/firestore";
export const getproductos= async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"))
    //productos.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
    //});
    const resp = []
    //console.log('querySnapshot :>> ', querySnapshot);
    querySnapshot.forEach((doc) => (
        resp.push({
            id: doc.id,
            ...doc.data(),
          })
      ));
    

      res.status(200).json(resp)
  } catch (error) {
    console.error(error);
  }
};

export const nuevoproducto=async (req, res) => {
    
  const { titulo,subtitulo,descripcion,precio, stock, imagen} = req.body;
  console.log('req.body :>> ', req.body);

  await addDoc(collection(db, "productos"), {
    titulo:titulo,
    subtitulo:subtitulo,
    descripcion:descripcion,
    precio:precio,
    stock:stock,
    imagen:imagen,
  })
    

  res.json("producto successfully")
 
  


};

export const eliminarproducto= async (req, res) => {
  const {id}=req.params
  const docRef = doc(db, "productos", id);

  await deleteDoc(docRef)
  .then(() => {
      res.json("Producto deleted successfully.")
  })
  .catch(error => {
      res.json(error);
  })
};

export const getproducto= async (req, res) => {
  const {id}=req.params
  const docRef = doc(db, "productos", id);
  await getDoc(docRef).then((data) => {
    console.log('res.data() :>> ', data.data());
    return res.json(data.data())
  });

  //const doc = await db.collection("productos").doc(req.params.id).get();
  //res.render("index", { contact: { id: doc.id, ...doc.data() } });
};

export const editaproducto= async (req, res) => {
  const {id}=req.params;
  const { titulo,subtitulo,descripcion,precio, stock, imagen} = req.body;
  const docRef = doc(db, "productos", id);
  const data = {
    titulo: titulo,
    subtitulo: subtitulo,
    descripcion: descripcion,
    precio:precio,
    stock: stock,
    imagen: imagen
  };

  await setDoc(docRef, data)
  .then(()=> {
      res.json("Producto aclualizado");
  })

};


