import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";

import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import MoviePage from "./pages/Movies/MoviePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="movies" element={<MoviePage />} />
        <Route path="movies/:id" element={<MovieDetailPage />} />{" "}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
