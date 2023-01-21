import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, CircularProgress } from '@mui/material';
import {Elements,CardElement,useStripe , useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useStateValue } from '../../context/StateProvider';
import { gettotalcarrito } from '../../reducer/reducer';
import acc from 'accounting'
import { async } from '@firebase/util';
import axios from 'axios'
import { actionTypes } from '../../reducer/reducer';
const stripepromise=loadStripe('pk_test_51MSBucCzTstzWM5Ayiglf4HbNMcnlVnoDiLOKyxHiNUcBxcaBSRj2HsJ6OkjyH8452jSWMPSguBSPBDJGgkbPCqj007CwClyBy')
export default function PagoForm({activeStep, handleBack, handleNext, steps}) {
 



  
  function FormularioPago({activeStep, handleBack, handleNext, steps}) {
    const [loading, setLoading] = React.useState(false);
    const [{carrito},dispatch] = useStateValue()
    const stripe=useStripe()
    const elements=useElements()
    const [datapagos,setDatapagos] =React.useState( { 
        brand:"",
        exp_month:"",
        exp_year:"",
        last4:""
    }) 
  
    function setdatapago(){
      dispatch({
          type:actionTypes.set_datapago,
          datapago:datapagos
      })
    }  
    const handlesubmit= async (event) =>{
      event.preventDefault()
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card: elements.getElement(CardElement)
  
      })
      console.log('payloadMethod :>> ', paymentMethod);
      if(!error){
        const {id,card}=paymentMethod;
        setLoading(true);
        await axios.post('http://localhost:4000/api/checkout',
          { id:id,
            precio:gettotalcarrito(carrito)*100
          }
        ).then((res)=>{
          console.log('res :>> ', res);
          datapagos.brand=card.brand
          datapagos.exp_month=card.exp_month
          datapagos.exp_year=card.exp_year
          datapagos.last4=card.last4
          
          console.log('datapagos :>> ', datapagos);
          
        }).catch((error)=>{
          console.log('error :>> ', error);
        })
        setLoading(false);
      }
     setdatapago();
     handleNext()
    }
    return (
      <div>
        <form onSubmit={handlesubmit}
        >

      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardElement/>
        </Grid> 
      </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
           {activeStep !== 0 && (
             <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
               Atras
             </Button>
           )}

           <Button
            disabled={loading}
              type='submit'
             variant="contained"
            // onClick={(e)=>{handlesubmit(e);handleNext()}}
             sx={{ mt: 3, ml: 1 }}
           >
             {loading ?  <CircularProgress color='success'size={15}></CircularProgress>: (activeStep === steps.length - 1 ? 'Siguiente' :`Realizar Pago ${acc.formatMoney(gettotalcarrito(carrito),'$')}`)}
           </Button>
   </Box>
   </form>
      </div>
    );
  }



  return (
    <React.Fragment>
      
      <Typography variant="h6" gutterBottom>
        Metodo de Pago
      </Typography>
      <Elements stripe={stripepromise}>
        <FormularioPago activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} steps={steps}></FormularioPago>
      </Elements>   
    </React.Fragment>
  );
}