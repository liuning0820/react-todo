import logo from './logo.svg';
import './App.css';
import Todo from "./components/Todo";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>My ToDo</h2>
      </header>

        <Todo text='Learn React'></Todo>
        <Todo text='Master React'></Todo>
    </div>
  );
}

export default App;
