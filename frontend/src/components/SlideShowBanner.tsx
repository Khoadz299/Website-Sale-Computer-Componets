import React, { useEffect, useState } from "react";

const Slideshow = ({ ListImage }: { ListImage: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ListImage.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + ListImage.length) % ListImage.length
    );
  };

  useEffect(() => {
    const interval = setInterval(prevSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden h-[400px]">
        <img
          src={ListImage[currentIndex]}
          alt="Slideshow"
          className="w-full h-full transition-transform duration-500"
        />
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2 cursor-pointer z-10">
        <img src="../src/assets/arrow_back.png" className="w-8 h-8" alt="" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2 cursor-pointer z-10">
        <img src="../src/assets/arrow_forward.png" className="w-8 h-8" alt="" />
      </button>
    </div>
  );
};

export default Slideshow;
