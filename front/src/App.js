import logo from './logo.svg';
import './App.css';
import Producto from './components/Producto';
import Navbar from './components/Navbar';
import Productos from './components/Productos';
import CompraPage from './components/CompraPage';
import {BrowserRouter,
  Routes,
  Route,
  Link,} from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { auth } from './firebase';
import { useEffect } from 'react';
import { actionTypes } from './reducer/reducer';
import { useStateValue } from './context/StateProvider';
import Checkout from './components/FormPago/Checkout';
function App() {
  const [{user},dispatch]=useStateValue()
  
  useEffect(()=>{
    getuser()
  },[])


  function getuser(){
    auth.onAuthStateChanged((authUser)=> {
      if (authUser) {
        dispatch(
        {
          type:actionTypes.set_user,
          user:authUser
        }
        )
      }
    })
  }
  return (
    <div className="App">
  
      <BrowserRouter>   
       <Navbar/>
       <Routes>
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
