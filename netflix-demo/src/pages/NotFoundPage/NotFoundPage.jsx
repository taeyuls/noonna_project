import React from "react";
import "./NotFoundPage.style.css";

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">페이지를 찾을 수 없습니다.</p>
      <a href="/" className="notfound-link">
        홈으로 돌아가기
      </a>
    </div>
  );
};

export default NotFoundPage;
