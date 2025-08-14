import React from 'react'
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { updateToPastes,addToPastes } from '../redux/Pasteslice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Home = () => {
    
    const [title,setTitle]=useState('');
    const [value,setValue]=useState('');
    const [searchParams,setSearchParams]=useSearchParams();
    const pasteId=searchParams.get("pasteId");
    const dispatch =useDispatch();
    const allPastes=useSelector((state) => state.paste.pastes);

     useEffect(() => {
        // console.log("inside use effect");
        if(pasteId) {
           const paste =allPastes.find((p) => p._id === pasteId);
           console.log("page found");
           setTitle(paste.title);
           setValue(paste.content); 
        }
    
    },[pasteId]);
    
    function createPaste() {
    const paste ={
        title: title,
        content:value,
        _id: pasteId || 
         Date.now().toString(36),
         createdAt:new Date().toISOString(),
    };
    //Get existing pastes from localStorage
   

    if(pasteId) {
        //update
        dispatch(updateToPastes(paste));
    }
    else {
      //create
      dispatch(addToPastes(paste));
    }


   

    //after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
    }

  return (
   <div>
     <div className='flex flex-row gap-7 place-content-around'>
      <input className='p-1 rounded-2xl  text-xl mt-8 ml-5 border w-[59%] pl-4'
       type="text" placeholder="Enter title here:" value={title} onChange={(e)=>setTitle(e.target.value)}/>
       
       <button  onClick={createPaste} className='p-2 rounded-2xl border mt-8 font-bold bg-blue-500 text-white text-xl'>
        {
            pasteId? "Update My Paste":"Create My Paste"
        }
       </button>
       
        
    </div>
   <div className='mt-8 m-[162px]'>
        <textarea className='rounded-2xl mt-4 w-[71%] p-4 border text-xl'
            value={value}
            placeholder="Enter Content Here:"
            onChange={(e)=> setValue(e.target.value)}
            rows={20}
        />

        
    </div>
   </div>
  )
}

export default Home
