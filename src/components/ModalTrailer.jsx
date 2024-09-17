import React from 'react';
import ReactPlayer from 'react-player/youtube'; // Biblioteca para exibir o vídeo

const ModalTrailer = ({ trailer, onClose }) => {
  if (!trailer) return null;

  return (
    <div className='bg-black flex fixed justify-center items-center z-10 bg-opacity-80 inset-0 h-screen w-full'>
      <div className='bg-black p-8 w-[80%] h-[70vh] relative'>
        <button
          onClick={onClose}
          className='absolute text-red-500 top-0 right-4 text-2xl font-bold'
        >
          X
        </button>
        <ReactPlayer 
          url={`https://www.youtube.com/watch?v=${trailer}`} 
          width='100%' 
          height='100%' 
          controls 
        />
      </div>
    </div>
  );
};

export default ModalTrailer;
