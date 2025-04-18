import { useQuery } from "@tanstack/react-query";
import { fetchBooksByQuery } from "../api/bookApi";

export default function BookList({ query }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["books", query],
    queryFn: () => fetchBooksByQuery(query),
    enabled: !!query,
  });

  if (!query)
    return <p className="p-6 text-gray-500">검색어를 입력해주세요.</p>;
  if (isLoading) return <p className="p-6 text-gray-500">로딩 중...</p>;
  if (error) return <p className="p-6 text-red-500">에러 발생!</p>;
  if (!data || !data.docs || data.docs.length === 0)
    return <p className="p-6 text-gray-500">검색 결과가 없습니다.</p>;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {data.docs.slice(0, 12).map((book, i) => (
        <li key={i} className="bg-white rounded shadow p-2">
          <img
            src={
              book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "https://via.placeholder.com/150x220"
            }
            alt="cover"
            className="w-full h-[220px] object-cover rounded"
          />
          <h3 className="text-sm font-semibold mt-2 truncate">{book.title}</h3>
          <p className="text-xs text-gray-500">{book.author_name?.[0]}</p>
        </li>
      ))}
    </ul>
  );
}
