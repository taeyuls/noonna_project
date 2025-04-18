export const fetchBooksByQuery = async (query) => {
  const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  if (!res.ok) throw new Error("검색 실패");
  return res.json();
};

export const fetchBooksBySubject = async (subject) => {
  const res = await fetch(`https://openlibrary.org/subjects/${subject}.json`);
  if (!res.ok) throw new Error("주제 검색 실패");
  return res.json();
};
