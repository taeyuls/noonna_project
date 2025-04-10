import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Login = () => {
  return (
    <div className="flex items-center justify-center mt-20 bg-muted">
      <div className="bg-background p-8 rounded-2xl shadow-lg w-full max-w-sm border">
        <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">
          Login
        </h2>
        <form className="flex flex-col gap-4">
          <Input type="email" placeholder="E-Mail" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" className="w-full">
            Join
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
