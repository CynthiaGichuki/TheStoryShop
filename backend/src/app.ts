import express from 'express'
import router from './routes/productRoutes'
import UserRouter from './routes/userRoutes'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app= express()

app.use(express.json())
app.use(cors())

app.use('/product', router)
app.use('/user',UserRouter)
app.listen(process.env.PORT, ()=>{
    console.log(`Listening to Port : ${process.env.PORT} `);
    
})



// http.createServer((req,res)=>{
//     res.end('Hello from Server')
// }).listen(3000, ()=>{
//     console.log('Server Running...');
    
// })


