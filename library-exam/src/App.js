import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import BookList from "./components/BookList";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import { useUserStore } from "./stores/userStore";

const queryClient = new QueryClient();

function MainPage() {
  const email = useUserStore((state) => state.email);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {email && (
        <p className="px-6 py-2 text-blue-600 font-medium">
          {email} 님 환영합니다.
        </p>
      )}
      <SearchBar onSearch={setSearchQuery} />
      <BookList query={searchQuery} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
