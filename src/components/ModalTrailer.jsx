import React from 'react';
import ReactPlayer from 'react-player/youtube'; // Biblioteca para exibir o vídeo

const ModalTrailer = ({ trailer, onClose }) => {
  if (!trailer) return null;

  return (
    <div className='bg-black flex fixed justify-center items-center z-10 bg-opacity-80 inset-0 h-screen w-full '>
      <div className='bg-black p-5 md:p-10 w-full md:w-[50vw] h-[70vh] relative mx-4'>
        <button
          onClick={onClose}
          className='absolute text-red-500 top-2 right-6 text-2xl font-bold'
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
