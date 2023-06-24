import React, { useState, useEffect } from 'react';
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }


  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };

      }
      return task;
    });
    setTasks(updatedTasks);
    
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    console.log(id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const [tasks, setTasks] = useState(props.tasks);

    // useEffect to run once the component mounts
    useEffect(() => {
      // localstorage only support storing strings as keys and values
      // - therefore we cannot store arrays and objects without converting the object
      // into a string first. JSON.stringify will convert the object into a JSON string
      localStorage.setItem("tasks", JSON.stringify(tasks));
      // add the tasks as a dependancy because we want to update
      // localstorage anytime the tasks state changes
    }, [tasks]);



  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
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
