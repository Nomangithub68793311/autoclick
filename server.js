import express from'express';
const app = express();
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()
import mongoose  from'mongoose'
import cors from 'cors'
import router  from './routes/authroute.js'
import connectDB from './database.js'

let interval;
// const getApiAndEmit = "TODO";

app.use(cors())
app.use(express.json());

const server=http.createServer(app)


connectDB()


app.get('/yoyo',(req, res) =>{

    // req.device.type.toUpperCase()
      const dev=req.device.type.toUpperCase()
      return res.status(200).json({ success: dev })


    if (req.useragent.isDesktop === true){
     return res.status(200).json({ success: "isDesktop" })

    }
    if (req.useragent.isMobile === true){
     return res.status(200).json({ success: "isMobile" })

    }

 })





const port = process.env.PORT || 5000;

server.listen(port, () => { console.log(`server run at ${port}`) })
// app.use(changeEvent)
app.use(router)
