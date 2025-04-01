import React from "react";

const Box = (props) => {
  console.log("props", props);
  return (
    <div className="box">
      <h1>{props.title}</h1>
      <img className="item-img" src={props.item && props.item.img} />
    </div>
  );
};

export default Box;
