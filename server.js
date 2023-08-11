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


app.get('/check',(req, res) =>{

      const dev=req.device.type.toUpperCase()
      return res.status(200).json({ success: "respose from server" })




 })





const port = process.env.PORT || 5000;

server.listen(port, () => { console.log(`server run at ${port}`) })
// app.use(changeEvent)
app.use(router)
