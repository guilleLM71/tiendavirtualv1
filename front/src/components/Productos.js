import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Producto from './Producto';
//import products from '../data'
import { Typography } from '@mui/material';
import axios from 'axios';
import { async } from '@firebase/util';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
 
}));


export default function Productos() {
  const [products,setProducts]=React.useState([])
  React.useEffect( ()=>{
    getproductos()
  },{})

async function getproductos(){
  try {

    await axios.get(
      `http://localhost:4000/api/productos/getproductos`,
      {
        headers: {
          "Content-Type": "application/json"
         },
      }
    ).then((res)=>{  
     console.log('res :>> ', res);
     setProducts(res.data)

    });
   // navigate('/admin/products');
  } catch (err) {
      console.log('err :>> ', err);
  }
}

  return (
    <Box sx={{ flexGrow: 1 , margin:2, padding :1}}>
       <Typography align='center'>
           <h2>Productos</h2> 
        </Typography>
      <Grid container spacing={2}>
        {
          products.map((product)=>

            (<Grid item xs={12} sm={6} md={4} lg={3}>
            <Producto 
            key={product.id}
            product={product}
            //titulo={product.descripcion} 
            //subtitulo={product.descripcion}
            //descripcion={product.descripcion} 
            //precio={product.precio}        
            //stock={product.stock}
           // imagen={product.imagen}
            >
    
            </Producto>
            </Grid>)
          )
        }
     
        
      </Grid>
    </Box>
  );
}