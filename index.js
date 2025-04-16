import express from "express";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import vendorRoutes from "./routes/vendorRoutes.js";
import firmRoutes from "./routes/firmRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import bodyParser from "body-parser";

const app = express();

const port = 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("moongoDB connected successfully"))
    .catch((error) => console.log(error))
app.use(bodyParser.json())
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.listen(port, () => { console.log(`server started and running at ${port}`) })

app.use('/home', (_, res) => {
    res.send("<h1> Welcome to server </h1>");
})