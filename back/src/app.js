import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import Stripe from "stripe";

import pkg from "../package.json";


//import pacientRoutes from "./routes/paciente.routes";
import authroutes from "../routes/authroutes";
import productosroutes from "../routes/productsroutes";
import uploadroutes from "../routes/uploadroutes";
//import { createRoles, createAdmin} from "./libs/initialSetup";
//import {conn}  from './database';

const stripe=new Stripe('sk_test_51MSBucCzTstzWM5A9HfFveh4Q58pd7UWeyi7pKXtAGqeeiHykvulwtCuYnE3rHLsmv6XLzdukMYVTHrHQ9dIN7IW00em9sZxN1')
//conn();
const app = express();
//createRoles();
//createAdmin();

// Settings
app.set("pkg", pkg);
app.set("port",4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
   origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Products API",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

app.post("/api/checkout", async (req, res) =>{
  console.log('req.body :>> ', req.body);
  const {id,precio}=req.body;
  const amount=precio
  try {
    const payment=await stripe.paymentIntents.create({
      amount,
      currency:"USD",
      description:"carrito de compras",
      payment_method:id,
      confirm:true

    })
    console.log('payment :>> ', payment);
    return res.status(200).json({msg:"success"})
  } catch (error) {
    return res.status(400).json({msg:error.raw.message})
  }
})

// Routes

app.use("/api/upload", uploadroutes);
app.use("/api/productos", productosroutes);
app.use("/api/auth", authroutes);
export default app;
