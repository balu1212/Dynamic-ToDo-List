import Droparea from "./Droparea";
import React from "react";
const Completedtask=(props)=>
    {
        const {completedTasks,setDraggbleCard,onDrop,droppedFrom,setDroppedFrom}=props;
        const status ="completed";
        return(
            <div className="section"><h2>Completed</h2>
            <Droparea onDrop={()=>onDrop(status,0,droppedFrom)}/>
           {completedTasks.map((task,index,) => (
            <React.Fragment key={index}>
           <div key={task.id} className="taskContainer"draggable onDragStart={()=>{setDraggbleCard(task.id);setDroppedFrom(status);}} onDragEnd={()=>setDraggbleCard(null)}>
            <div className="taskItem">
              <h3 className='aboutTask'>{task.text} </h3>
              <p className='aboutTask'>{task.description} </p>
              <h5 className='aboutTask'>{task.timestamp}</h5>
            </div>
          </div>
          <Droparea onDrop={()=>onDrop(status,index+1,droppedFrom)}/>
          </React.Fragment>))} 
        </div>
        )
    }
    export default Completedtask;