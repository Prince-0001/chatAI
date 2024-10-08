import Chat from "../model/chat.js"

export const chat=async (req,res)=>{
    const userId=req.userId;
    try{
        const chat=await Chat.findOne({_id:req.params.id,userId});
        res.status(200).send(chat);

    }catch(err){
        console.log(err);
        res.status(500).send("Error fetching chat!");
    }
}

export const updateChat=async(req,res)=>{
    const userId=req.userId;

    const{question,answer,img} =req.body;

    const newItems=[

        ...(question
             ? [{role:"user",parts:[{text:question}],...(img&&{img})}]
             :[]),
        {role:"model",parts:[{text:answer}]}
    ]

    try{
        const updatedChat =await Chat.updateOne(
            {_id:req.params.id,userId},
            {   $push:{
                    history:{
                        $each:newItems,
                    },
                }
            
            }
        )

        
        
        res.status(200).send(updatedChat);

    }catch(err){
        console.log(err);
        res.status(500).send("Error adding conversation!");
    }
}