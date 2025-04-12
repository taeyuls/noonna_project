import "./App.css";
import CountBox from "./components/CountBox";
import counterStore from "./stores/countStore";

function ButtonGroup({ increese, decreese, increeseBy, decreeseBy }) {
  return (
    <div>
      <button onClick={increese}>+ increese</button>
      <button onClick={decreese}>- decreese</button>
      <button onClick={() => increeseBy(10)}>+10 increese</button>
      <button onClick={() => decreeseBy(10)}>-10 decreese</button>
    </div>
  );
}

function App() {
  const { count, increese, increeseBy, decreeseBy, decreese } = counterStore();

  return (
    <div className="App">
      <h1>count: {count}</h1>

      <ButtonGroup
        increese={increese}
        decreese={decreese}
        increeseBy={increeseBy}
        decreeseBy={decreeseBy}
      />

      <CountBox />
    </div>
  );
}

export default App;
