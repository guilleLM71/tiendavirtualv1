import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import { useStateValue } from '../../context/StateProvider';
import { gettotalcarrito } from '../../reducer/reducer';
import acc from 'accounting'


export default function Review({activeStep, handleBack, handleNext, steps}) {
    const [{carrito,datacompra,datapago},dispatch] = useStateValue()
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {carrito.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.titulo} secondary={product.descripcion} />
            <Typography variant="body2">{acc.formatMoney(product.precio)}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {acc.formatMoney(gettotalcarrito(carrito),'$')}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Datos
          </Typography>
          <Typography gutterBottom>{datacompra.nombre}</Typography>
          <Typography gutterBottom>{datacompra.direccion}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            
              <React.Fragment >
              <Grid item xs={12}>
                  <Typography gutterBottom>Card: {datapago.brand}</Typography>
              </Grid>
              <Grid item xs={12}>
                  <Typography gutterBottom>Exp: {datapago.exp_month+"/"+datapago.exp_year}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>NCard: ************{datapago.last4}</Typography>
                </Grid>
              </React.Fragment>
            
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Atras
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? `Terminar` : 'Siguiente'}
                </Button>
              </Box>


      </Grid>
    </React.Fragment>
  );
}