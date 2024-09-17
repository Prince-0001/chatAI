
import Chat from '../model/chat.js'
import UserChats from '../model/userChats.js'

export const chats=async(req,res)=>{

    const {text}= req.body;
    const userId=req.userId;
    try{
        const newChat=new Chat({
            userId:userId,
            history:[{
                role:"user",parts:[{text}]
            }]
        })
        const savedChat = await newChat.save();

        //check if userChat is exists

        const userChats = await UserChats.find({userId:userId});

        if(!userChats.length){
            const newUserChats=new UserChats({
                userId:userId,
                chats:[
                    {
                        _id:savedChat._id,
                        title:text.substring(0,40),


                    }
                ]
            })

            await newUserChats.save();
        }else{
            await UserChats.updateOne({userId:userId},{
                $push:{
                    chats:{
                        _id:savedChat._id,
                        title:text.substring(0,40)
                    }
                }
            })
        }

        res.status(201).send(newChat._id);

    }catch(err){
      console.log(err)  ;
      res.status(500).send("Error creating chat!!")
    }

}
