import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { Button } from "../ui/button";

export default function Navbar() {
  const navigate = useNavigate();
  const email = useUserStore((state) => state.email);
  const logout = useUserStore((state) => state.logout);

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-black sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-green-400">태율의 도서관</h1>
      <div className="flex items-center gap-4">
        <span className="text-lm text-green-500">{email}님 환영합니다~!</span>
        <Button variant="outline" onClick={() => navigate("/")}>
          Main
        </Button>
        <Button variant="outline">My Book</Button>

        {email ? (
          <>
            <Button variant="destructive" onClick={logout}>
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
