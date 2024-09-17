import UserChats from "../model/userChats.js";

export  const userChats=async(req,res)=>{
    const userId=req.userId;
    // console.log(userId);

    try{
       const userChats= await UserChats.find({userId});

       res.status(200).send(userChats[0].chats||[])
    }catch(err){
        console.log(err);
        res.status(500).send("Unauthenticated");
    }
    
}