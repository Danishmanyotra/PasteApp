import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateToPastes, addToPastes } from "../redux/Pasteslice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("final paste", paste);
  return (
    <div className='flex flex-col items-center'>
      <div className='w-full flex flex-col items-center'>
      <h1 className='font-bold text-3xl mt-4'>Title:</h1>
        <input
          className="p-1 rounded-2xl mt-2 border w-[59%] pl-4"
          type="text"
          placeholder="Enter title here:"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

       
      </div>
      <div className='w-full flex flex-col items-center mt-10'>
      <h1 className='font-bold text-3xl'>Content</h1>
        <textarea
          className="rounded-2xl mt-4 w-[59%] p-4 border"
          value={paste.content}
          placeholder="Enter Content Here"
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
