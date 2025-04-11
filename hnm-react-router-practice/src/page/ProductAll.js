import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const getProducts = async (searchQuery) => {
    let url = `https://my-json-server.typicode.com/taeyuls/miniProject/products?q=${searchQuery}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      setProductList(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 검색어 변경될 때마다 호출되는 함수
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    setQuery({ q: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const searchQuery = searchInput.trim();
      getProducts(searchQuery);
    }
  };

  useEffect(() => {
    const searchQuery = query.get("q") || ""; // URL의 q 파라미터 값 가져오기
    setSearchInput(searchQuery);
    getProducts(searchQuery); // 초기 로딩 시에도 API 호출
  }, [query]);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-center items-center">
        <div className="relative w-[300px]">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"
            className="border-b border-orange-200 px-4 py-2 w-full rounded-md focus:outline-none focus:border-b-2 focus:border-orange-200 transition-all ease-in-out duration-300"
          />
          <button
            onClick={() => getProducts(searchInput)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-orange-200 hover:text-orange-500 transition-all duration-300"
          >
            🔍
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {productList.length === 0 ? (
          <div>결과가 없습니다.</div>
        ) : (
          productList.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-2 hover:shadow-lg cursor-pointer relative"
              onClick={() => handleClick(item?.id)}
            >
              <img
                src={item?.img}
                alt={item?.title}
                className="w-full h-48 object-cover rounded-md"
              />

              {/* 배지: NEW / 추천 */}
              <div className="absolute top-2 left-2 space-y-1">
                {(item.new === true || item.new === "true") && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    NEW
                  </span>
                )}
                {item.choice && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    추천
                  </span>
                )}
              </div>

              <h4 className="mt-2 font-semibold text-sm">{item?.title}</h4>
              <p className="text-gray-500 text-sm">
                ₩{item?.price?.toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductAll;
