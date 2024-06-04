import React from 'react';
import Completedtask from './Completedtask';
import Droparea from './Droparea';

const Inprogress = (props) => 
    {
        const {inProgressTasks,setInProgressTasks,tasks,setDraggbleCard,onDrop,completedTasks,setCompletedTasks,
            droppedFrom,setDroppedFrom}=props
    //This function is called when user click complete button
    const handleMoveToCompleted = (id) => {
        const task = tasks.find(task => task.id === id);
        setInProgressTasks(inProgressTasks.filter(task => task.id !== id));
        setCompletedTasks([...completedTasks, { ...task, timestamp: new Date().toLocaleString() }]);
    };
    const status='inProgress';
    return (
        <>
        <div className="section">
            <h2>In Progress</h2>
            <Droparea onDrop={()=>onDrop(status,0,droppedFrom)}/>
            {inProgressTasks.map((task,index) => (<React.Fragment key={index}>
            <div key={task.id} className="taskContainer" draggable onDragStart={()=>{setDraggbleCard(task.id);setDroppedFrom(status)}} onDragEnd={()=>setDraggbleCard(null)}>
                <div className="taskItem">
                    <h3 className='aboutTask'>{task.text}</h3>
                    <p className='aboutTask'>{task.description}</p>
                </div>
                <button onClick={() => handleMoveToCompleted(task.id)}>Complete</button></div>
                <Droparea onDrop={()=>onDrop(status,index+1,droppedFrom)}/>
                </React.Fragment>))}
        </div>
        <Completedtask completedTasks={completedTasks} setDraggbleCard={setDraggbleCard} onDrop={onDrop} droppedFrom={droppedFrom}  setDroppedFrom={setDroppedFrom} />
        </>
    )
}
export default Inprogress