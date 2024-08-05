import React, { useState, useEffect, useCallback, useMemo } from "react";

interface Product {
  id: string;
  name: string;
  brand: string;
  memory: string;
  gpu_chip: string;
  memory_type: string;
  quantity: number;
  price: number;
  url: string;
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ProductVGA = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const itemsPerPage: number = 12;

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Trì hoãn 500ms

  const sortProducts = useCallback(
    (order: string) => {
      const sortedProducts = [...filteredProducts].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      );
      setFilteredProducts(sortedProducts);
      setSortOrder(order);
    },
    [filteredProducts]
  );

  const filterProducts = useCallback(
    (term: string) => {
      const filtered = [...products].filter(
        (product) =>
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.brand.toLowerCase().includes(term.toLowerCase()) ||
          product.memory.toLowerCase().includes(term.toLowerCase()) ||
          product.gpu_chip.toLowerCase().includes(term.toLowerCase()) ||
          product.memory_type.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(1);
    },
    [products]
  );

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts, itemsPerPage]
  );

  const displayedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredProducts, currentPage, itemsPerPage]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:6060/product-vga`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts(debouncedSearchTerm);
  }, [debouncedSearchTerm, filterProducts]);

  useEffect(() => {
    const fetchImageProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:6060/list-image-product/type/VGA`
        );
        const dataListImage = await response.json();
        const updatedProducts = filteredProducts.map((product) => {
          const matchingImage = dataListImage.find(
            (image) => image.product_id === product.id
          );
          return {
            ...product,
            url: matchingImage ? matchingImage.url : null,
          };
        });
        setFilteredProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (filteredProducts.length > 0 && !filteredProducts[0].url) {
      fetchImageProducts();
    }
  }, [filteredProducts]);

  return (
    <div className="container mx-auto py-8 w-4/5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sản phẩm card đồ họa VGA</h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-16 py-2 border rounded mr-2"
          />
          <button
            onClick={() => sortProducts("asc")}
            className={`px-10 py-2 ${
              sortOrder === "asc" ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}>
            Giá thấp đến cao
          </button>
          <button
            onClick={() => sortProducts("desc")}
            className={`ml-2 px-4 py-2 ${
              sortOrder === "desc" ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}>
            Giá cao đến thấp
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedProducts.map((product) => (
          <div key={product.id} className="border rounded p-4">
            <img
              src={product.url}
              alt={product.name}
              className="w-auto h-[200px] object-cover mb-4 mx-auto cursor-pointer"
            />

            <h2 className="text-lg font-semibold">{product.name}</h2>

            <p className="text-gray-600 mt-3">Thương hiệu: {product.brand}</p>

            <p className="text-gray-600 mt-3">VRAM : {product.memory}</p>

            <p className="text-gray-600 mt-3">Chip VGA: {product.gpu_chip}</p>
            <p className="text-gray-600 mt-3">
              Thế hệ bộ nhớ : {product.memory_type}
            </p>

            <p className="text-red-600 text-2xl mt-3">
              {formatCurrency(product.price)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1
                ? "bg-gray-800 text-white"
                : "bg-gray-200"
            }`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductVGA;
