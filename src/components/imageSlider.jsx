import { useState } from "react";

export default function ImageSlider({ images }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div className="bg-white w-[70%] aspect-square rounded-2xl shadow-2xl relative overflow-hidden">
        <img
          src={activeImage}
          className="w-full h-full object-cover rounded-2xl transition-all duration-500"
          alt="Active"
        />

        <div className="hidden lg:flex h-[100px] w-full bg-white/40 backdrop-blur-md absolute bottom-0 left-0 justify-center items-center gap-3 p-2 rounded-t-xl">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => setActiveImage(image)}
              className={`h-full aspect-square cursor-pointer rounded-lg transition-transform duration-300 border-2 shadow-sm ${
                activeImage === image
                  ? "border-[#DC143C] scale-105 shadow-lg"
                  : "border-transparent hover:opacity-90 hover:scale-105"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-[-90px] w-full h-[90px] flex lg:hidden justify-center items-center gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => setActiveImage(image)}
              className={`h-[70px] aspect-square cursor-pointer rounded-full transition-transform duration-300 border-2 shadow-sm ${
                activeImage === image
                  ? "border-[#DC143C] scale-105 shadow-lg"
                  : "border-gray-300 hover:opacity-90 hover:scale-105"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
