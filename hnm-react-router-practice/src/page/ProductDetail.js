import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProductDetail = async () => {
    try {
      const url = `https://my-json-server.typicode.com/taeyulde/miniProject/products/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("받아온 데이터는??", data);

      if (data && data.id) {
        setProduct(data);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("상품 정보를 불러오지 못했어요:", error);
      setProduct(null);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  if (!product) {
    return (
      <div className="text-center py-10">상품 정보를 불러오는 중입니다...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 이미지 영역 */}
        <div className="flex-1 flex justify-center">
          <img
            src={product.img}
            alt={product.title}
            className="w-full max-w-md rounded"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="text-xl font-bold">
            {product.price?.toLocaleString()}원
          </p>

          {product.choice && (
            <p className="text-sm text-green-600">Conscious choice</p>
          )}

          <select className="border border-gray-300 rounded px-3 py-2 w-full">
            <option value="">사이즈 선택</option>
            {product.size?.map((s, idx) => (
              <option key={idx} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button className="bg-black text-white w-full py-3 rounded hover:bg-gray-800">
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
