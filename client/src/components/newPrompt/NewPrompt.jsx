import React, { useEffect, useRef, useState } from 'react'
import './newPrompt.css';
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from "react-markdown"
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NewPrompt = ({data}) => {

  const [question,setQuestion] =useState("");
  const [answer,setAnswer]=useState("");
  const [img,setImg]= useState({
    isLoading:false,
    error:"",
    dbData:{},
    aiData:{},
  })
 

 const chat = model.startChat({
  history: data.history.map((item) => {
    return {
      role: item.role,
      parts: item.parts.map((part) => {
        return { text: part.text };
      }),
    };
  }),
  generationConfig: {}, 
});

  const endRef=useRef(null);

  useEffect(()=>{
      endRef.current.scrollIntoView({behavior:"smooth"})
    },[data,answer,question,img.dbData]);



    const queryClient=useQueryClient();
  
    const mutation =useMutation({
      mutationFn: ()=>{
        return fetch(import.meta.env.VITE_API_URL+`/api/chats/${data._id}`,{
          method:"PUT",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            question:question.length? question:undefined,
            answer:answer,
            img:img.dbData?.filePath || undefined})
        }).then((res)=>res.json())
      },
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["chat",data._id]}).then(()=>{
          setQuestion("")
          setAnswer("")
          setImg({
            isLoading:false,
            error:"",
            dbData:{},
            aiData:{},
          })
        });
      },
      onError:(err)=>{
        console.log(err);
      }
    })

  const add =async(text,isInitial)=>{
    if(!isInitial)setQuestion(text);
    try{
      const result= await chat.sendMessageStream(Object.entries(img.aiData).length?[img.aiData,text]:[text]);
      let accumulatedText="";
      for await(const chunk of result.stream){
        const chunkText= chunk.text();
        accumulatedText+=chunkText
        setAnswer(accumulatedText)
      }
      mutation.mutate();
    }catch(err){
      console.log(err);
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const text=e.target.text.value;
    if(!text) return ;

    add(text,false);
    e.target.text.value="";
  }

  // in production we don't need it
  const hasRun=useRef(false);
  useEffect(()=>{
    if(!hasRun.current){
      if(data?.history?.length===1){
        add(data.history[0].parts[0].text,true);
      }
    }
    hasRun.current=true;
  },[hasRun])


  return (
    <>
    {/* ADD NEW CHAT */}
    {img.isLoading&& <div>Loading...</div>}
    {img.dbData?.filePath&& (
      <IKImage 
      urlEndpoint={import.meta.env.VITE_IMAGE_kIT_ENDPOINT}
      path={img.dbData?.filePath}
      width="300"
      transformation={[{width:300}]}
      />
      
    )}
    {question&&<div className='message user'>{question}</div>}
    {answer&&<div className='message '><Markdown>{answer}</Markdown></div>}
    <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg}/>
        <input type="file" multiple={false} hidden name="" id="file" />
        <input type="text" name="text" placeholder='Ask anything...'  id="" />
        <button type='submit' >
            <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  )
}

export default NewPrompt
