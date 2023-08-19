const express=require("express");
const { NoteModel } = require("../Models/notesModel");
const { auth } = require("../Middleware/Auth");

const noteRouter=express.Router();

noteRouter.post("/create",auth,async(req,res)=>{
try {
    const note=new NoteModel(req.body)
    await note.save()
    res.send({"msg":"A new not has been added"})
} catch (error) {
    res.send({error:"error"})
}
})

noteRouter.get("/",auth,async(req,res)=>{
    try {
        const note=await NoteModel.find({userID:req.body.userID})
        res.send(note)
        
    } catch (error) {
        res.send({error:"error"})
    }
    })

noteRouter.patch("/update/:noteID",auth,async(req,res)=>{
const {noteID}=req.params;
const note=await NoteModel.findOne({_id:noteID})
try {
    if(req.body.userID!==note.userID){
            res.send({"msg":"you are not authorized"})
    }
    else{
        await NoteModel.findByIdAndUpdate({_id:noteID},req.body);
    res.send({"msg":"not with id has been updated"})
    }
    
} catch (error) {
    res.send({"error":error})
}
})

noteRouter.delete("/delete/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params;
    const note=await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.userID!==note.userID){
            res.send({"msg":"you are not authorized"})
        }
        else{
            await NoteModel.findByIdAndDelete({_id:noteID});
            res.send({"msg":"note with id has been deleted"})
        }
       
    } catch (error) {
        res.send({"error":error})
    }
    })


module.exports={
    noteRouter
}