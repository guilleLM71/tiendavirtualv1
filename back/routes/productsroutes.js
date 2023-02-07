

const { Router } = require("express");
const router = Router();
import * as productos from "../controller/productcontroller";

router.get("/getproductos",
    productos.getproductos
);

router.post("/nuevoproducto", 
    productos.nuevoproducto
);

router.delete("/eliminarproducto/:id", 
    productos.eliminarproducto
);

router.get("/getproducto/:id", 
    productos.getproducto
);

router.post("/editarproducto/:id", 
    productos.editaproducto
);

export default router;