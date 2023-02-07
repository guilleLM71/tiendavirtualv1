

const { Router } = require("express");
const router = Router();
import * as uploadimage from "../controller/uploadcontroller";

import multer from 'multer';

const upload = multer();


router.post(
    '/',
    upload.single('file'),
    uploadimage.uploadimage
)

export default router;