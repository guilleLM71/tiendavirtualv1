import logo from './logo.svg';
import './App.css';
import Producto from './components/Producto';
import Navbar from './components/Navbar';
import Productos from './components/Productos';
import CompraPage from './components/CompraPage';
import {BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useRoutes,} from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { auth } from './firebase';
import { useEffect, useState } from 'react';
import { actionTypes } from './reducer/reducer';
import { useStateValue } from './context/StateProvider';
import Checkout from './components/FormPago/Checkout';
import AdminRegistrarProductos from './components/Admin/AdminRegistrarProductos';
import axios from 'axios';
import AdminProductos from './components/Admin/AdminProductos';
function App() {
  //const navigate=useNavigate()
 
  const [{user,rolusuario},dispatch]=useStateValue()

  const [authe, setAuthe] = useState(
		false 
	);
	const [token, setToken] = useState('');

  useEffect(()=>{
    getuser()
    
  },[])

 
  function getuser(){
    auth.onAuthStateChanged(async (authUser)=> {
      if (authUser) {
        dispatch(
        {
          type:actionTypes.set_user,
          user:authUser
        }
        )
        console.log('authUser :>> ', authUser);
        const rolres= await axios.post("http://localhost:4000/api/auth/getrol", {
          uid: authUser.uid
        },
          {
            headers: { 'Content-aplication': 'application/json'}
          }
        )
           dispatch(
            {
              type: actionTypes.set_rol,
              rolusuario:rolres.data.infoFinal
          })
         
       // console.log('rol :>> ', rolusuario);
        //console.log('login :>> ', rolres.data);
        
        

        setAuthe(true);
				localStorage.setItem('auth', true);
				//console.log('authUser.uid :>> ', authUser.uid);
       
        /*
        authUser.getIdToken().then((token) => {
          //console.log('token :>> ', token);
					setToken(token);
				});*/

      }
    }
    
    
    )

  


  }


  function RequireAuth({children})  {
    const [{rolusuario}]=useStateValue()
    //const navigate=useNavigate()
    //const router = useRoutes()
    console.log('rolauth :>> ', rolusuario);
    if (rolusuario=="usuario") {
      //console.log(' es usuario :>> ');
      //navigate("/",{ replace: true }
       return  <Navigate to="/" />   
    }
    return children
    
    
    
    
  }
  return (
    <div className="App">
  
      <BrowserRouter>   
       <Navbar/>
       <Routes>

       <Route  path='/Admin' element={ <RequireAuth ><AdminProductos/></RequireAuth> }>
       </Route>
       <Route path='/checkout' element={  <Checkout/>}>
       
       </Route>
       <Route path='/signup' element={  <SignUp/>}>
       
       </Route>
       <Route path='/signin' element={  <SignIn/>}>
       
       </Route>
         <Route path='/compras' element={  <CompraPage/>}>
       
         </Route>
         <Route path='/' element={<Productos/>}>
          
        </Route>
       
       </Routes>
      </BrowserRouter>
        
     
 
    </div>
  );
}

export default App;
