import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';
import router from './routes/userRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config()
// app.use('/',(req,res)=>
// {
//     res.send('hello welcome');

// })
const connectDB = async()=>
{
    try{
   await mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    console.log('mongodb is connected')
   } catch (error) {
      console.log(error)
   }
}

connectDB();
app.use('/api',router)
app.listen(3000,()=>
{
    console.log(`running in properly going`)
})