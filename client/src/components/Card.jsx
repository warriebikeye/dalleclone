import React from 'react'
import { download } from '../assets'
import { deleteicon } from '../assets'
import { downloadImage } from '../utils'

const deleteImage = async (id) => {
  try {
    const response = await fetch(`https://dalle-backend-s4lh.onrender.com/api/v1/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (response.ok) {
      // Refresh the page after successful deletion
      window.location.reload();
    } else {
      alert(result.error || 'Failed to delete image.');
    }
  } catch (error) {
    alert('Error deleting image:', error.message || error);
  }
};

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img 
        className='w-full h-full object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-md overflow-y-auto prompt'>{prompt}</p>

        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <div className="flex gap-2 justify-start items-center">
  <button type='button' onClick={() => downloadImage(_id, photo)} className='outline-none bg-transparent border-none'>
    <img src={download} alt='download' className='w-6 h-6 object-contain invert' />
  </button>
  <button type='button' onClick={() => deleteImage(_id)} className='outline-none bg-transparent border-none'>
    <img src={deleteicon} alt='delete' className='w-6 h-6 object-contain invert' />
  </button>
</div>

        </div>
      </div>
    </div>
  )
}

export default Card;
