import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CompraProducto from './CompraProducto';
import { Typography } from '@mui/material';
import Total from './Total';
import { useStateValue } from '../context/StateProvider';
import { gettotalcarrito } from '../reducer/reducer';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
 
}));

function ListaProducto(){

    const [{carrito},dispatch] = useStateValue()

    return(
        <React.Fragment>
        
            {  
             carrito.map((product)=>(
            
             <Grid item xs={12} sm={8} md={6} lg={4}>
                
                 
                    <CompraProducto 
                            key={product.id}
                            product={product}     
              
                            >
                            </CompraProducto>
    
        </Grid> ))
 }
        </React.Fragment>
    )
}

export default function CompraPage() {
  return (
    <Box sx={{ flexGrow: 1 , margin:2, padding :1 }}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align='center'>
           <h2>Carrito de productos</h2> 
        </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={9} container spacing={2}>
            <ListaProducto></ListaProducto>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
        <Typography align='center'>
            <Total></Total>
        </Typography>
        </Grid>
        
      </Grid>
    </Box>
  );
}