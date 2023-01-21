import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../reducer/reducer';
export default function DireccionForm({activeStep, handleBack, handleNext, steps}) {
  const [datauser,setDatauser] =React.useState( {
    nombre:"",
    apellido:"",
    direccion:"",
    ciudad:"",
    provincia:"",
    postal:"",


  }) 
  const [{datacompra},dispatch]=useStateValue()
  const hadleChange=({target:{name,value}})=>{
    setDatauser({...datauser,[name]:value})
    }

  function setdatacompra(){
    dispatch({
        type:actionTypes.set_datacompra,
        datacompra:datauser
    })
  }  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos de la compra
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={datauser.nombre}
            onChange={hadleChange}
            id="Nombre"
            name="nombre"
            label="Nombres"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="apellidos"
            name="apellido"
            value={datauser.apellido}
            onChange={hadleChange}
            label="Apellidos"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="direccion"
            name="direccion"
            value={datauser.direccion}
            onChange={hadleChange}
            label="Direccion"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ciudad"
            name="ciudad"
            value={datauser.ciudad}
            onChange={hadleChange}
            label="Ciudad"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="provincia"
            name="provincia"
            value={datauser.provincia}
            onChange={hadleChange}
            label="Provincia o Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="postal"
            value={datauser.postal}
            onChange={hadleChange}
            label="Zip / Codigo Postal"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Atras
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={()=>{handleNext();setdatacompra();}}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Terminar orden' : 'Siguiente'}
                </Button>
              </Box>

      </Grid>
    </React.Fragment>
  );
}