import React, { useEffect, useState } from "react";

interface DataItem {
  id: number;
  url: string;
  order_image: string;
}

const SlideShowProducts = ({ product_type }: { product_type: string }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= data.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? data.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  useEffect(() => {
    fetch(`http://localhost:6060/list-image-product/type/${product_type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: DataItem[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    // const interval = setInterval(prevSlide, 3000); // Change slide every 3 seconds
    // return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
          }}>
          {data.map((product) => (
            <div key={product.id} className="w-1/4 p-2 flex-shrink-0">
              <div className="bg-white p-4">
                <img src={product.url} className="w-full h- object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2  text-white p-2">
        <img src="../src/assets/arrow_back.png" className="w-8 h-8" alt="" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 ml-2 transform -translate-y-1/2  text-white p-2">
        <img src="../src/assets/arrow_forward.png" className="w-8 h-8" alt="" />
      </button>
    </div>
  );
};

export default SlideShowProducts;
