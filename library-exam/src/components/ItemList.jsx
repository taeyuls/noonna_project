import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "./Spinner";

const fetchBooks = async (query) => {
  const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  if (!res.ok) throw new Error("데이터 불러오기 실패");
  return res.json();
};

export default function ItemList({ query }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["books", query],
    queryFn: () => fetchBooks(query),
    enabled: !!query,
  });

  if (!query)
    return <p className="p-6 text-gray-500">검색어를 입력해주세요.</p>;
  if (isLoading) return <Spinner />;
  if (error) return <p className="p-6 text-red-500">에러 발생!</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {data?.docs?.slice(0, 12).map((book) => (
        <div
          key={book.key}
          className="border rounded p-4 bg-white shadow hover:shadow-lg transition"
        >
          {book.cover_i ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
              className="h-48 w-full object-cover rounded"
            />
          ) : (
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          )}
          <h2 className="mt-2 font-bold text-lg">{book.title}</h2>
          <p className="text-sm text-gray-600">{book.author_name?.[0]}</p>
        </div>
      ))}
    </div>
  );
}
