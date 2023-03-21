const express=require('express');
const app=express();
const cors=require('cors');
const PORT=process.env.port || 5000;
const mongoose  = require('mongoose');
const connectDB = require('./config/dbConnection');
require("dotenv").config();
const path=require('path');
connectDB();
app.use(cors());
app.use(express.json());


app.use('/todo',require('./routes/TodoRoutes'));  

// app.post("/todos/create", (req, res) => {
//   console.log("CReate ALL TODOS");
// });
// app.put("/todos/:id", (req, res) => {
//   console.log("Put ALL TODOS");
// });
// app.delete("/todos/:id", (req, res) => {
//   console.log("delete ALL TODOS");
// });

app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
    
})


app.listen(PORT,()=>{
   console.log('listening on port',PORT)
});
