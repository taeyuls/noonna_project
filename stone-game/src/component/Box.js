import React from "react";

const Box = ({ title, item, result }) => {
  let displayResult = result;

  // 컴퓨터 박스일 때, 승패 뒤집기
  if (title === "Computer" && result && result !== "tie") {
    displayResult = result === "win" ? "lose" : "win";
  }

  return (
    <div className={`box ${displayResult}`}>
      <h2>{title}</h2>
      {item && (
        <>
          <img src={item.img} alt={item.name} />
          <h3>{item.name}</h3>
        </>
      )}
      {displayResult && <p className="result">{displayResult}</p>}
    </div>
  );
};

export default Box;
