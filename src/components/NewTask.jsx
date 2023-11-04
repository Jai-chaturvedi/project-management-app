import React from 'react'
import { useState,useRef } from 'react';
import Modal from './Modal';
const NewTask = ({onAdd}) => {
    const[enteredTask,setEnteredTask] = useState('');
    const modal = useRef();
   function handleChange(event){
     setEnteredTask(event.target.value);
   }
    let modalContent='';
   function handleClick(){
      if(enteredTask.trim()===''){
        modal.current.open();
        return ;
      }
      onAdd(enteredTask);
         setEnteredTask('');
   }
  return (
    <>
     <Modal ref={modal}>
            <h3>Please add some content for the task.</h3>
    </Modal>
    <div className="flex items-center gap-4">
        <input onChange={handleChange} value={enteredTask} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200"/>
        <button className="text-stone-50 p-1.5 bg-stone-600 hover:text-stone-300
        rounded" onClick={handleClick}>Add Task</button>
    </div>
    </>
  )
}

export default NewTask