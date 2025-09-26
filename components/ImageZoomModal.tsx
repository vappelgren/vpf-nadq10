import React from 'react';

interface ImageZoomModalProps {
  src: string;
  onClose: () => void;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({ src, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative animate-zoom-in" 
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={src} 
          alt="Zoomed product view" 
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" 
        />
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 text-white bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-2xl leading-none hover:bg-gray-700 transition-colors"
          aria-label="Close zoomed image"
        >
          &times;
        </button>
      </div>
       <style>{`
          @keyframes zoom-in {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-zoom-in {
            animation: zoom-in 0.3s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default ImageZoomModal;
