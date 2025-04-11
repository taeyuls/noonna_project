import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Login = ({ setAuthenticate }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const Navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() && pw.trim()) {
      Cookies.set("isLogin", true, { expires: 1 }); // 쿠키에 로그인 상태 저장
      setAuthenticate(true);
      Navigate("/");
    } else {
      alert("이메일과 비밀번호를 입력해주세요");
    }
  };

  return (
    <div className="flex items-center justify-center mt-20 bg-muted">
      <div className="bg-background p-8 rounded-2xl shadow-lg w-full max-w-sm border">
        <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">
          Login
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Join
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
