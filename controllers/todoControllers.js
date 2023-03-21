const { request, json } = require('express');
const Todo=require('../models/Todo');



const getTodo = async (req, res) => {
  const todo=await Todo.find();
  res.status(200).json(todo);
};
const setTodo = async (req, res) => {
    const {text}=req.body;
    if(!text){
        res.status(400).json({message:"Todo is mandatory"});
        
    }
    const createdTodo=await Todo.create({text});
     res.status(200).json(createdTodo);
   
};

const updateTodo = async (req, res) => {
    const singleTodo=await Todo.findById(req.params.id);
  
    if(!singleTodo){
        res.status(404).json({ message: "Todo not found" });
    }
    singleTodo.complete =!singleTodo.complete;
    singleTodo.save();
      // const updateTodo = await Todo.findByIdAndUpdate(
      //   req.params.id,
      //   { data },
      //   { new: true }
      // );

      res.status(200).json(singleTodo);
};
const deleteTodo = async (req, res) => {
   const singleTodo = await Todo.findById(req.params.id);
   

   if (!singleTodo) {
     res.status(404).json({ message: "Todo not found" });
   }

   const deletedTodo =await  Todo.deleteOne({ _id:req.params.id});
    res.status(200).json(singleTodo);
};

module.exports={getTodo,setTodo,updateTodo,deleteTodo};