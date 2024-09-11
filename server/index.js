import express from "express";
import ImageKit from "imagekit";
import dotenv from 'dotenv';
import cors from 'cors'
import { connect } from "./database/db.js";
import chatRoute from './routes/chatRoute.js'
// import path from "path";
// import url, {fileURLToPath} from 'url'
dotenv.config();

const port=process.env.PORT || 3000;
const app=express();

// const _filename=fileURLToPath(import.meta.url);
// const _dirname= path.dirname(_filename)

console.log(process.env.IMAGE_KIT_ENDPOINT)
const imagekit = new ImageKit({
    urlEndpoint: "https://ik.imagekit.io/uqzqfzzbn",
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
  });

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}))

app.use(express.json());



app.get("/api/upload",(req,res)=>{
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.get("/test",(req,res)=>{
    res.send("it works!");
})

app.use("/api",chatRoute);

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(401).send("Unauthenticated");
})

// app.use(express.static(path.join(_dirname,"../client")))

// app.get("*",(req,res)=>{
//     res.sendFile(path.join(_dirname,"../client","index.html"))
// })
app.listen(port,()=>{
    connect();
    console.log(`server running on ${port}`);
})