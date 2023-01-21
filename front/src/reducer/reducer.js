export const initialState={
    carrito: [],
    user:null,
    datacompra:{},
    datapago:{},
    mensajelisto:""

}
export const actionTypes={
    add_carrito: "add_carrito",
    rm_carrito: "rm_carrito",
    set_user: "set_user",
    rm_user: "rm_user",
    set_datacompra:"set_datacompra",
    set_datapago:"set_datapago",
    set_mensaje:"set_mensaje",
}
   
export const gettotalcarrito = (carrito) =>{
    return carrito?.reduce((precio,item)=>item.precio+precio,0)
}
 const reducer = (state, action)=>{
    console.log(action);
    switch(action.type) {
        case "add_carrito":
         return{
             ...state,
            carrito: [...state.carrito, action.item]
            }
        case "rm_carrito":
            const index = state.carrito.findIndex((item)=>item.id===action.item.id)
            const clon=[...state.carrito]
            console.log('index :>> ', index);
            console.log('clon :>> ', clon);
            if(index>=0){
                clon.splice(index, 1)
                console.log('clon :>> ', clon);
            }else{
                console.log('no:>> ')
                 }
            return{
                ...state,
                carrito: clon
            }
        case "set_user":
            return{
                ...state,
               user: action.user
               }
        case "rm_user":
            return{
            ...state,
            carrito:action.carrito,
            user: action.user
        }
        case "set_datacompra":
            return{
            ...state,
            datacompra: action.datacompra
        }
        case "set_datapago":
            return{
            ...state,
            datapago:action.datapago,

        }
        case "set_mensaje":
            return{
            ...state,
            mensajelisto: action.mensajelisto
        }

        default: return state;
    }
}
export default reducer
