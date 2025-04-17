import { useState } from "react";
import { Button } from "../ui/button";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center gap-2 px-4 py-8 bg-white shadow-sm"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="검색할 책 제목을 입력하세요"
        className="border px-4 py-2 rounded w-[300px]"
      />
      <Button type="submit">검색</Button>
    </form>
  );
}
