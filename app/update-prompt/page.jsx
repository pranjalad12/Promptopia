'use client'
// import React, { useEffect } from 'react'
// import {useState} from 'react'
// import {useSession} from 'next-auth/react'
// import { useRouter, useSearchParams } from "next/navigation";
import Form from '../../components/Form'



// const EditPrompt = () => {
//     const router=useRouter();
//     const {data:session} = useSession();
//     const searchParams = useSearchParams();
//     const promptId = searchParams.get("id");
//     const [submitting, setsubmitting] = useState(false);
//     const [post,setpost] = useState({
//         prompt:'',
//         tag:'',
//     });



//     useEffect(()=>{
//         const fetchdata = async()=>{
//             const response = await fetch(`/api/prompt/${promptId}`);
//             const data = await response.json();
//             setpost({
//                 prompt:data.prompt,
//                 tag:data.tag,
//             });
//         }
//         if(promptId){
//             fetchdata();
//         }
//     },[promptId]);


//     const EditPrompt =async(e)=>{
//         e.preventDefault();
//         setsubmitting(true);
//         try{
//             const response = await fetch('api/prompt/${promptId}',{
//                 method:'PATCH',
                
//                 body:JSON.stringify({
//                     prompt:post.prompt,
//                     tag:post.tag
//                 })
//             })
//             if(response.ok){
//                 router.push('/')
//             }
//         }
//         catch(error){
//             console.log(error);
//         }
//         finally{
//             setsubmitting(false);
//         }
//     }
//   return (
//     <Form 
//       type="Edit"
//        post={post}
//        setpost={setpost}
//        submitting={setsubmitting}
//        handleSubmit={EditPrompt}
//     />
//   )
// }

// export default EditPrompt


import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setpost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;