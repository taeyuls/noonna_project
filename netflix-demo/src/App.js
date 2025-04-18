import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";

// 홈페이지 /
// 영화 전체보여주는 페이지 (서치) /movies
// 영화 상세 페이지 /movies/:id

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
      </Route>
    </Routes>
  );
}

export default App;
