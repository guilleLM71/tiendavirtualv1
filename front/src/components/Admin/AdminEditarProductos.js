
import { async } from '@firebase/util';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Card, CardMedia, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2'
const theme = createTheme();

function AdminEditarProductos({id,producto}) {
    
  const [product, setProduct] = useState({
    titulo: "",
    subtitulo: "",
    descripcion: "",
    stock: "",
    precio: "",
    imagen: "",
  });

  const [loadingUpload, setLoadingUpload] = useState(false)
  useEffect(() => {
    //console.log('product :>> ', product);
    getProduct()
  }, []);

 function getProduct(){
   /*
    try {

        await axios.get(
          `http://localhost:4000/api/productos/getproducto/${id}`,
          {
            headers: {
              "Content-Type": "application/json"
             },
          }
        ).then((res)=>{  
         console.log('res :>> ', res);
         setProduct(res.data)
    
        });
       // navigate('/admin/products');
      } catch (err) {
          console.log('err :>> ', err);
      }*/
      setProduct(producto)

  }
  
   const submitHandler = async (e) => {
       e.preventDefault();
       try {

         await axios.post(
           `http://localhost:4000/api/productos/editarproducto/${id}`,
           {
             titulo:product.titulo,
             subtitulo:product.subtitulo,
             descripcion:product.descripcion,
             stock:product.stock,
             precio:product.precio,
             imagen:product.imagen

           },
           {
             headers: {
               "Content-Type": "application/json"
              },
           }
         ).then((res)=>{  
          console.log('res :>> ', res);
          Swal.fire({
            title: "Producto editado correctamente",
            icon: 'success',
            confirmButtonText: 'Cerrar'
          })
         });
        // navigate('/admin/products');
       } catch (err) {
           console.log('err :>> ', err);
           Swal.fire({
            title: err,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
       }
     };
  
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    // console.log('bodyFormData :>> ', bodyFormData);
    //setProduct({...product,[e.target.name]:bodyFormData});
    try {

      setLoadingUpload(true)
      const { data } = await axios.post('http://localhost:4000/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          //authorization: `Bearer ${userInfo.token}`,
        },
      });
      setLoadingUpload(false)
      console.log('data :>> ', data);
      setProduct({ ...product, [e.target.name]: data.secure_url });
      console.log('product :>> ', product);
    } catch (err) {
      console.log('err :>> ', err);
    }
  };

  const hadleChanged = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value })
  }
    return (
        <ThemeProvider theme={theme}>
      <Container  maxWidth="lg">
      <Typography alignItems={'center'} fontSize={30}
        
        >Editar Productos</Typography>
        <CssBaseline />
        <Grid container spacing={2}>
      
        <Box
        component="form"
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap:3
          }}
        >
        <Box
        component="form"
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap:3
          }}
        >
           
          <Grid item xs={12}>
          <TextField
            name='titulo'
            placeholder='Titulo'
            value={product.titulo}
            onChange={(e) => hadleChanged(e)}
            required
          /></Grid>
<Grid item xs={12}>
          <TextField
            name='subtitulo'
            placeholder='Subtitulo'
            value={product.subtitulo}
            onChange={(e) => hadleChanged(e)}
            required
          /></Grid>
<Grid item xs={12}>
          <TextField
            name='descripcion'
            placeholder='Descripcion'
            value={product.descripcion}
            onChange={(e) => hadleChanged(e)}
            required
          /></Grid>
<Grid item xs={12}>
          <TextField
            name='precio'
            type="number"
            placeholder='Precio'
            value={product.precio}
            onChange={(e) => hadleChanged(e)}
            required
          /></Grid>
<Grid item xs={12}>
          <TextField
          type="number"
          placeholder='Stock'
            name='stock'
            value={product.stock}
            onChange={(e) => hadleChanged(e)}
            required
          /></Grid>
          

         

        </Box>
        <Box
            sx={{
              margin:"auto" ,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5
            }}
          >
            <div>
            <Grid item xs={12}>
              <Typography>Image File</Typography>
              <TextField
                name='imagen'
                type="file"

                onChange={(e) => uploadFileHandler(e)}
                required
              /></Grid>

            </div>
            
            <div>
            <Grid item xs={12}>
              <Typography>Imagen</Typography>

              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height={product.imagen ? 150 : 0}
                  image={product.imagen}
                  alt="Sin imagen"
                /></Card>
              {loadingUpload && <CircularProgress></CircularProgress>}
              </Grid>
            </div>
            <Button disabled={false}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={submitHandler}
          >
            Actualizar
          </Button>
          {
            //loadingUpdate && <LoadingBox></LoadingBox>
          }
          </Box>
          </Box>
          </Grid>
      </Container>
    </ThemeProvider>
    );
}

export default AdminEditarProductos;