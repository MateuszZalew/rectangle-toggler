import Board from "./components/board";
import "./App.css";

const App = () => {
  return (
    <main className="App">
      <Board numCols={5} numRows={5} />
    </main>
  );
};

export default App;
