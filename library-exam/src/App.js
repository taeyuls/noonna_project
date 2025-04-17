import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ItemList from "./components/ItemList";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

const queryClient = new QueryClient();

function MainPage({ userEmail }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userEmail={userEmail} />
      {userEmail && (
        <p className="px-6 py-2 text-blue-600 font-medium">
          {userEmail} 님 환영합니다.
        </p>
      )}
      <SearchBar onSearch={setSearchQuery} />
      <ItemList query={searchQuery} />
    </div>
  );
}

function App() {
  const [userEmail, setUserEmail] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage userEmail={userEmail} />} />
          <Route
            path="/login"
            element={<Login setUserEmail={setUserEmail} />}
          />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
