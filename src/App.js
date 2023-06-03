import logo from './logo.svg';
import './App.css';
import Todo from "./components/Todo";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Todo text='Learn React'></Todo>
        <Todo text='Master React'></Todo>
      </header>
    </div>
  );
}

export default App;
