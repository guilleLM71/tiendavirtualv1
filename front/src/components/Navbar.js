import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../logo.png'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { auth } from '../firebase';
import { actionTypes } from '../reducer/reducer';
export default function Navbar({children}) {

  const navigate=useNavigate()
  const [{carrito,user,rolusuario},dispatch] = useStateValue()

  function logout(){
    auth.signOut()
    dispatch(
      {
        type: actionTypes.rm_user,
        user:null,
        carrito:[],
        rolusuario:""
          
    })
    navigate("/")
  }




  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
    <Link to="/">
    <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"          
          >
            <img src={logo} width={50} height={50} />
          </IconButton>
    </Link>

        

      
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hola {user? user.email:""}
          </Typography>


          <Link to="/admin">
         
         {
           rolusuario=="admin"? 
           <IconButton aria-label="">
             <Button  variant='text' sx={{ color: "white" }}>Productos</Button>    
         </IconButton>  :
           null
         }
         
       </Link>


          <Link to="/signin">
          <IconButton aria-label="">
            <Button onClick={logout} variant='text' sx={{ color: "white" }}>{user?"SignOut":"SignIn"}</Button>    
            </IconButton>  
          </Link>

          <Link to="/compras">
          {rolusuario!="admin"? 
                    
          
            <IconButton aria-label="add to favorites">
                      <Badge badgeContent={carrito.length} color="error">
                      <AddShoppingCartIcon  sx={{ color: "white" }}/>
                      </Badge>
                    </IconButton>
            
                     :null 
        }
</Link>
        </Toolbar>
      </AppBar>
    </Box>
 
    </>
  );
}