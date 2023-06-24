import React, { useState, useEffect } from 'react';
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  serverTimestamp,
  addDoc,
  deleteDoc,
  doc,
  query, 
  orderBy,
  updateDoc
} from "firebase/firestore";







const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.task.completed,
  Completed: (task) => task.task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {


  const [todos, setTodos] = useState([
    // {id:1, task:{ id: "todo-0", name: "Eat", completed: true }},
    // {id:2,task:{ id: "todo-1", name: "Think", completed: true }},
    // {id:3,task:{ id: "todo-2", name: "Speep", completed: true }},
  ]);

  
  const [input, setInput] = useState('');
  // useEffect(() => {
  //   onSnapshot(collection(db, "todos"), (snapshot) => {
  //     setTodos(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, [input]);


  useEffect(() => {
    onSnapshot(collection(db, "todos"), (snapshot) => {
        setTodos(snapshot.docs.map(doc => ({
            id: doc.id,
            task: doc.data()
        })))
    })
}, [input]);


  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = {id:`todo-${nanoid()}`,task:{ id: `todo-${nanoid()}`, name, completed: false }};
    setTodos([...todos, newTask]);
    addDoc(collection(db, "todos"), { id: `todo-${nanoid()}`, name, completed: false });
    setInput('')
  }


  function toggleTaskCompleted(id) {
    const updatedTasks = todos.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted

        task.task.completed = !task.task.completed
        updateDoc(doc(db, "todos", task.id), task.task);

        return { ...task, completed: !task.task.completed };

      }
      return task;
    });
    setTodos(updatedTasks);
    
  }

  function editTask(id, newName) {
    const editedTaskList = todos.map((task) => {
      console.log("edit task");
      console.log(task);
      // if this task has the same ID as the edited task
      if (id === task.id) {

        task.task.name = newName

        updateDoc(doc(db, "todos", task.id), task.task);

          return { ...task, name: newName };
      }
      return task;
    });
    setTodos(editedTaskList);


    
  }

  function deleteTask(id) {
    console.log(id);
    const remainingTasks = todos.filter((task) => id !== task.id);
    setTodos(remainingTasks);
    deleteDoc(doc(db, "todos", id));

  }


  // const [tasks, setTasks] = useState(todos);

  const taskList = todos
  .filter(FILTER_MAP[filter])
  .map((task) => (
    console.log(task),
    <Todo
      id={task.id}
      name={task.task.name}
      completed={task.task.completed}
      key={task.task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

const filterList = FILTER_NAMES.map((name) => (
  <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
));

const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
      <h1>Todo App</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        // role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
