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
      className="flex justify-center items-center gap-3 px-6 py-8 bg-black shadow-md"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="도서를 검색하세요..."
        className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 rounded-md w-[320px] transition duration-200"
      />
      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200"
      >
        검색
      </Button>
    </form>
  );
}
