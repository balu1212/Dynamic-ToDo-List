import React, { useState } from 'react';
import './App.css';
import Inprogress from './components/Inprogress';
import Droparea from './components/Droparea';
function App() {
  const [show, setShow] = useState(false);//This is used to show form field
  const [task, setTask] = useState('');//This for task in Input
  const [description, setDescription] = useState('');//This for description in input
  const [tasks, setTasks] = useState([]);//This is for add making task object
  const [pendingTasks, setPendingTasks] = useState([]);//This is used to add task into pending tasks
  const [inProgressTasks, setInProgressTasks] = useState([]);//This is used to add task in progressbar
  const [draggableCard,setDraggbleCard]=useState(null);//This is used to store draggable card id
  const [droppedFrom,setDroppedFrom]=useState('');
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
  //This function is used to handle to submission of form
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask(task, description);
    setTask('');
    setDescription('');
    setShow(!show);
  }
  //This function is used to handle to show or hide the from
  const handlePlus = () => {
    setShow(!show);
  }

  const status='pending' //This is used to status of column

  //This function is used to remove dragged item from dragged array
  const removeDragElement=(a,b)=>
    {
      console.log(' a value is '+a+"-----b value is "+b);
      if(a===''||a===undefined||a===null)
        {
          console.log(a+"so b value is "+b);
        }
      else if(a==="pending")
        {
          let indexToRemove = pendingTasks.findIndex(item => item.id ===b);
          if(indexToRemove !== -1)
            {
             pendingTasks.splice(indexToRemove,1);
            }
        }
        else if(a==='inProgress')
          {
            let indexToRemove = inProgressTasks.findIndex(item => item.id ===b);
          if(indexToRemove !== -1)
            {
             inProgressTasks.splice(indexToRemove,1);
            }
          }
        else if(a==='completed')
        {
         
          let indexToRemove = completedTasks.findIndex(item => item.id ===b);
          if(indexToRemove !== -1)
            {
             completedTasks.splice(indexToRemove,1);
             
            }
        }
    }
  //This function is used to handle onDrop
  const onDrop=(stat,index,droppedFrom)=>
    {
      removeDragElement(droppedFrom,draggableCard);
      // console.log(`${droppedFrom} is going place into ${stat} at the position ${index}`);
      const tk = tasks.find(t => t.id === draggableCard); 
      if(stat==="pending")
        {
           pendingTasks.splice(index,0,tk);
           setPendingTasks(pendingTasks);
        }
        else if(stat==='inProgress')
          {
             inProgressTasks.splice(index,0,tk)
          }
          else
          {
                const ctk={...tk,timestamp: new Date().toLocaleString()}
                completedTasks.splice(index,0,ctk)
          }
    }

  return (
    <div className="App">
      <h1>Dynamic ToDo-List</h1>
      {show && (<div className="add-task" >
        <form className='toggleForm' onSubmit={handleSubmit}>
          <input type="text" value={task} placeholder="Enter task..." onChange={(e) => { setTask(e.target.value); }} />
          <input type="text" value={description} placeholder="Enter task description..." onChange={(e) => { setDescription(e.target.value); }} />
          <button type="submit">Submit</button>
        </form>
      </div>)}
      <div className='sectionCategories'>
        <div className="section">
          <h2>Pending</h2>
          <Droparea onDrop={()=>onDrop(status,0,droppedFrom)}/>
          {pendingTasks.map((task,index )=> (<React.Fragment key={index}>
            <div key={task.id} className="taskContainer" 
            draggable onDragStart={()=>{setDraggbleCard(task.id);setDroppedFrom(status);}}
            onDragEnd={()=>{
            setDraggbleCard(null);
            }}>
              <div className="taskItem">
                <h3 className='aboutTask'>{task.text}</h3>
                <p className='aboutTask'>{task.description}</p>
              </div>
              <button onClick={() => handleMoveToInProgress(task.id)}>Start</button>
              </div>
             <Droparea onDrop={()=>onDrop(status,index+1,droppedFrom)}/>
             </React.Fragment>))}

          <button onClick={handlePlus}>+</button>
        </div>
        <Inprogress setInProgressTasks={setInProgressTasks} inProgressTasks={inProgressTasks} 
        tasks={tasks}  completedTasks={completedTasks} setCompletedTasks={setCompletedTasks}
        setDraggbleCard={setDraggbleCard} onDrop={onDrop} droppedFrom={droppedFrom}  setDroppedFrom={setDroppedFrom}/>
      </div>
    </div>);
}
export default App;

