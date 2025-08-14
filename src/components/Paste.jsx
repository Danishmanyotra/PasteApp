
// trial -2 
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/Pasteslice";
import toast from "react-hot-toast";
import editIcon from "../assets/edit.png";
import copyIcon from "../assets/copy.png";
import viewIcon from "../assets/view.png";
import deleteIcon from "../assets/delete.png";
import shareIcon from "../assets/share.webp";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;

    if (navigator.share) {
      // Native share option (mobile-friendly)
      navigator
        .share({
          title: paste.title,
          text: "Check out this paste!",
          url: shareUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard! You can paste it anywhere.");
    }
  }

  return (
    <div>
      <div className='flex justify-center'>
        <input
        className="p-2 rounded-2xl w-[57%] mt-5 border text-xl "
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border p-4 rounded-lg flex justify-between w-[57%] m-auto" key={paste?._id}>
              {/* left side  */}
                <div className='flex flex-col'>
                  <div className="font-bold text-2xl text-blue-500">{paste.title}</div>              
                <div className='text-xl'>{paste.content}</div>
                </div>

                {/* right-side  */}
                  <div className='flex flex-col items-end justify-between'>
                    <div className="flex flex-row gap-4 place-content-evenly mt-3">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}><img src={editIcon} alt="Edit" className='w-5 h-6'></img></a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}><img src={viewIcon} alt="View" className='w-6 h-8'></img></a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                   <img src={deleteIcon} alt="Delete" className='w-5 h-5'></img>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    <img src={copyIcon} alt="Copy" className='w-5 h-5'></img>
                  </button>
                  <button onClick={() => handleShare(paste)}><img src={shareIcon} alt="Share" className='w-5 h-6'></img></button>
                </div>
                 {/* date  */}
                <div className="text-sm text-gray-400 mt-2">
                  {paste.createdAt}
                </div>
                  </div>
                
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
