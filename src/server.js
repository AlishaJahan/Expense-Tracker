import dotenv from 'dotenv';
import express from 'express';  
dotenv.config();
const app = express()
app.use(express.json());

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})