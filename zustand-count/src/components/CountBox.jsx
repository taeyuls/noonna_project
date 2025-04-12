import React from "react";
import counterStore from "../stores/countStore";

const CountBox = () => {
  const { count } = counterStore();

  return <h2> CountBox: {count}</h2>;
};

export default CountBox;
