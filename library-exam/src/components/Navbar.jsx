import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar({ userEmail, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-700">태율의 도서관</h1>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/")}>
          Main
        </Button>
        <Button variant="outline">My Book</Button>
        {userEmail ? (
          <>
            <span className="text-sm text-gray-600">{userEmail}</span>
            <Button variant="destructive" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={() => navigate("/login")}>Login</Button>
        )}
      </div>
    </header>
  );
}
