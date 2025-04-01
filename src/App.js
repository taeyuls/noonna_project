import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

const choice = {
  stone: {
    name: "Stone",
    img: "images/stone.jpg",
  },
  scissor: {
    name: "Scissor",
    img: "images/scissor.jpg",
  },
  bo: {
    name: "Bo",
    img: "images/bo.jpg",
  },
};

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState(" ");
  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
  };

  const judgement = (user, computer) => {
    console.log("user", user, "computer", computer);

    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "stone")
      return computer.name === "Scissors" ? "win" : "lose";
    else if (user.name === "scissors")
      return computer.name === "Bo" ? "win" : "lose";
    else if (user.name === "bo")
      return computer.name === "Stone" ? "win" : "lose";
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log("random value", randomItem);
    let final = itemArray[randomItem];
    return choice[final];
  };

  return (
    <>
      <div className="main">
        <Box title="You" item={userSelect} result={result} />
        <Box title="Computer" item={computerSelect} />
      </div>

      <div className="main button">
        <button onClick={() => play("scissor")}>가위</button>
        <button onClick={() => play("stone")}>바위</button>
        <button onClick={() => play("bo")}>보</button>
      </div>
    </>
  );
}
export default App;
