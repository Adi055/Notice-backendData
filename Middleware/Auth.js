const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    console.log("kjj",token);
    if(token){

        const decoded=jwt.verify(token,"masai")
        if(decoded){
           
            req.body.userID=decoded.userID
            req.body.user=decoded.user
            next()
        }
        else{
            res.send({"msg":"please login"})
        }
    }
    else{
        res.send({"msg":"please login"})
    }
    
}

module.exports={
    auth
}