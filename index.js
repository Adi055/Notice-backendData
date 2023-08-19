const express=require("express");
const {connection}=require("./db");
const { userRouter } = require("./Routes/userRoutes");
const { noteRouter } = require("./Routes/noteRoutes");
const cors=require("cors")
const app=express();
app.use(cors())
app.use(express.json());
app.use("/users",userRouter)
app.use("/notes",noteRouter)

// app.get("/",(req,res)=>{2
// res.send("this is homepage")
// })



app.listen(8000,async()=>{
    try {
        await connection
        console.log("server running at 8000");
        console.log("connected to the db");
    } catch (error) {
        console.log(error);
    }

})