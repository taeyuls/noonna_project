import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { Button } from "../ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = useUserStore((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      login(email);

      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-[320px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>
    </div>
  );
}
