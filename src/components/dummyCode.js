import React, { useState } from 'react';
import './App.css';
function App() {
  const [show, setShow] = useState(false);//This is used to show form field
  const [task, setTask] = useState('');//This for task in Input
  const [description, setDescription] = useState('');//This for description in input
  const [tasks, setTasks] = useState([]);//This is for add making task object
  const [pendingTasks, setPendingTasks] = useState([]);//This is used to add task into pending tasks
  const [inProgressTasks, setInProgressTasks] = useState([]);//This is used to add task in progressbar
  const [completedTasks, setCompletedTasks] = useState([]);//This is used add task into completed task

  //This function is called when user click add task
  const handleAddTask = (taskText, taskdescription) => {
    const newTask = { text: taskText, description: taskdescription, id: Date.now() };
    setTasks([...tasks, newTask]); setPendingTasks([...pendingTasks, newTask]);
  };

  //This function is called when user click on start button
  const handleMoveToInProgress = (id) => {
    const task = tasks.find(task => task.id === id);
    setPendingTasks(pendingTasks.filter(task => task.id !== id));
    setInProgressTasks([...inProgressTasks, task]);
  };

  //This function is called when user click complete button
  const handleMoveToCompleted = (id) => {
    const task = tasks.find(task => task.id === id);
    setInProgressTasks(inProgressTasks.filter(task => task.id !== id));
    setCompletedTasks([...completedTasks, { ...task, timestamp: new Date().toLocaleString() }]);
  };

  //This function is called when used submitted form
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask(task, description);
    setTask('');
    setDescription('');
    setShow(!show);
  }

  //This function is used handle plus button
  const handlePlus = () => {
    setShow(!show);
  }
  return (
    <div className="App">
      <h1>Dynamic ToDo-List</h1>
      {show &&(<div className="add-task" >
        <form className='toggleForm' onSubmit={handleSubmit}>
          <input type="text" value={task} placeholder="Enter task..." onChange={(e) => { setTask(e.target.value); }} />
          <input type="text" value={description} placeholder="Enter task description..." onChange={(e) => { setDescription(e.target.value); }} />
          <button type="submit">Submit</button>
        </form>
      </div>)}
      <div className='sectionCategories'>

        <div className="section">
          {/* <div className="add-task">
        <input type="text" placeholder="Enter task..." onChange={(e)=>{setTask(e.target.value);}} onKeyDown={(e) => {
          if (e.key === 'Enter') { handleAddTask(task,description);  e.target.value = ''; setDescription('');setTask('');}
        }} />
        <input type="text" placeholder="Enter task description..." onChange={(e)=>{setDescription(e.target.value);}}
        onKeyDown={(e) => {if (e.key === 'Enter') { handleAddTask(task,description);  e.target.value = ''; setDescription('');setTask('');}}}/>
        <button onClick={(e)=>{handleAddTask(task,description); e.target.value = '';}}>Add Task</button>
         </div> */}

          <h2>Pending</h2>


          {pendingTasks.map(task => (
            <div key={task.id} className="taskContainer">
              <div className="taskItem">
                <h3 className='aboutTask'>{task.text}</h3>
                <p className='aboutTask'>{task.description}</p>
              </div>
              <button onClick={() => handleMoveToInProgress(task.id)}>Start</button></div>))}

          <button onClick={handlePlus}>+</button>
        </div>
        <div className="section">
          <h2>In Progress</h2>
          {inProgressTasks.map(task => (<div key={task.id} className="taskContainer">
            <div className="taskItem">
              <h3 className='aboutTask'>{task.text}</h3>
              <p className='aboutTask'>{task.description}</p>
            </div>
            <button onClick={() => handleMoveToCompleted(task.id)}>Complete</button></div>))}
        </div>
        <div className="section"><h2>Completed</h2>
          {completedTasks.map(task => (<div key={task.id} className="taskContainer"> 
          <div className="taskItem">
          <h3 className='aboutTask'>{task.text} </h3>
          <p className='aboutTask'>{task.description} </p> 
          <h5 className='aboutTask'>{task.timestamp}</h5>
          </div>
           </div>))}
          
        </div>
      </div>

    </div>);
}

export default App;

