import { ClassNames } from '@emotion/react';
import React from 'react';
import acc from 'accounting'
import { Button } from '@mui/material';
import { useStateValue } from '../context/StateProvider';
import { gettotalcarrito } from '../reducer/reducer';
import { Link } from 'react-router-dom';


function Total(props) {
    
    const [{carrito},dispatch] = useStateValue()
    return (
        <div >
            <h3>Total Items : {carrito?.length}</h3>
            <h4>{acc.formatMoney(gettotalcarrito(carrito),'$')}</h4>
            <Link to={"/checkout"}>   
            <Button variant='contained' color='secondary'>
                Procesar Compra
            </Button>
            </Link>
         
        </div>
    );
}

export default Total;