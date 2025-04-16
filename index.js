import express from "express";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import vendorRoutes from "./routes/vendorRoutes.js";
import firmRoutes from "./routes/firmRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const port = process.env.PORT || 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("moongoDB connected successfully"))
    .catch((error) => console.log(error))
app.use(cors());
app.use(bodyParser.json())
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.listen(port, () => { console.log(`server started and running at ${port}`) })

app.use('/', (_, res) => {
    res.send("<h1> Welcome to server </h1>");
})