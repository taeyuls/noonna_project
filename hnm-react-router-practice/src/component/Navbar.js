import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const goToLogin = () => {
    navigate("/Login");
  };

  const logout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const search = (event) => {
    if (event.key === "Enter") {
      let keyword = event.target.value;

      navigate(`/?q=${keyword}`);
    }
  };

  const goToProductAll = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="log-button">
        {isLoggedIn ? (
          <button className="logout-button" onClick={logout}>
            로그아웃
          </button>
        ) : (
          <button className="login-button" onClick={goToLogin}>
            <FontAwesomeIcon icon={faUser} />
            <div>로그인</div>
          </button>
        )}
      </div>
      <div className="nav-section" onClick={goToProductAll}>
        <img
          width={100}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png"
        />
      </div>
      <div className="menu-area">
        <ul className="menu-list">
          {menulist.map((menu, index) => (
            <li key={menu}>{menu}</li>
          ))}
        </ul>
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            onKeyPress={search}
            placeholder="발렌시아가 티셔츠는 없나요"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
