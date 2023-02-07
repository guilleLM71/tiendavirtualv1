
const { Router } = require("express");
const router = Router();
import * as auth from "../controller/authcontroller";

router.post("/",
    auth.nuevousuario
);

router.post("/getrol",
    auth.getRol
);
export default router;