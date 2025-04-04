import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

const choice = {
  stone: {
    name: "stone",
    img: "images/stone.jpg",
  },
  scissor: {
    name: "scissor",
    img: "images/scissor.jpg",
  },
  bo: {
    name: "bo",
    img: "images/bo.jpg",
  },
};

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState(null);
  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
  };

  const judgement = (user, computer) => {
    const userName = user.name.toLowerCase();
    const computerName = computer.name.toLowerCase();

    if (userName === computerName) {
      return "tie";
    } else if (userName === "stone")
      return computerName === "scissor" ? "win" : "lose";
    else if (userName === "scissor")
      return computerName === "bo" ? "win" : "lose";
    else if (userName === "bo")
      return computerName === "stone" ? "win" : "lose";
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    let randomIndex = Math.floor(Math.random() * itemArray.length);

    return choice[itemArray[randomIndex]];
  };

  return (
    <>
      <div className="main">
        <Box title="Me" item={userSelect} result={result} />
        <Box title="You" item={computerSelect} />
      </div>

      <div className="main button">
        <button onClick={() => play("scissor")}>가위</button>
        <button onClick={() => play("stone")}>바위</button>
        <button onClick={() => play("bo")}>보</button>
      </div>
      <div className={`result-message ${result || ""}`}>
        {result === "win" && "🎉 이겼다!"}
        {result === "lose" && "😢 졌다..."}
        {result === "tie" && "😐 비겼다!"}
      </div>
    </>
  );
}
export default App;
