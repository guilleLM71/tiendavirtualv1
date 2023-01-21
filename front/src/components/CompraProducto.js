import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import logo from '../logo.svg'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import acount from "accounting"
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../reducer/reducer';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CompraProducto({key,product:{id,titulo,subtitulo,descripcion, precio,stock,imagen}}) {
  const [expanded, setExpanded] = React.useState(false);
  const [{carrito},dispatch] = useStateValue()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const borrarproductocarrito = () =>{
    dispatch(
      {
        type: actionTypes.rm_carrito,
        item:{
        id
      }
    })
  }
  return (
    <Card sx={{ maxWidth: 345}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {acount.formatMoney(precio)}
          </IconButton>
        }
        title={titulo}
      />
      <CardMedia
        component="img"
        height="194"
        image={imagen}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {subtitulo}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={borrarproductocarrito}aria-label="delete">
          <DeleteIcon />
        </IconButton>
        
      </CardActions>
   
    </Card>
  );
}
