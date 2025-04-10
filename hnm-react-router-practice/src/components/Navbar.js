import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const menulist = [
    "여성",
    "Divided",
    "남성",
    "신생아/유아",
    "아동",
    "H&M HOME",
    "Sale",
    "지속가능성",
  ];

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const goToLogin = (e) => {
    e.stopPropagation(); // 클릭 전파 방지
    navigate("/Login");
  };

  const logout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const goToProductAll = () => {
    navigate("/");
  };

  return (
    <header
      className="flex flex-col p-4 justify-between cursor-pointer h-80"
      onClick={goToProductAll}
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/18824804/pexels-photo-18824804/free-photo-of-hm-logo-in-city-at-night.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-end w-full">
        {isLoggedIn ? (
          <Button variant="outline" onClick={logout} className="text-white">
            로그아웃
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={goToLogin}
            className="flex items-center gap-2 text-white hover:text-orange-200"
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Login</span>
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="sm:hidden">
          <Button
            variant="outline"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            MENU
          </Button>
        </div>

        <div
          className={`flex items-center justify-center gap-6 sm:mt-6 sm:flex-row mt-4 sm:gap-6 text-ms font-medium text-white`}
        >
          <ul
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:flex gap-6 sm:flex-row flex-col sm:gap-6`}
          >
            {menulist.map((menu) => (
              <li key={menu} className="hover:text-orange-200 cursor-pointer">
                {menu}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
