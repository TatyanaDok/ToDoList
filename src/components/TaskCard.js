import { Draggable } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';
const TaskCard = ({ item, index, removeTask, boardId, updateTask }) => {
 const [value, setValue] = useState(item.name);
 const [height, setHeight] = useState(
  localStorage.getItem(`cardHeight_${item.id}`) || 'auto'
 );
 useEffect(() => {
  localStorage.setItem(`cardHeight_${item.id}`, height);
 }, [item.id, height]);

 function handleRemove() {
  removeTask(boardId, item.id);
 }

 const handleChange = (e) => {
  updateTask(boardId, item.id, e.target.value);
  setValue(e.target.value);
  setHeight(`${e.target.scrollHeight}px`);
 };
 return (
  <>
   <Draggable key={item.id} draggableId={item.id} index={index}>
    {(provided) => (
     <div
      className="item"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
     >
      {' '}
      <button className="button__remove" onClick={handleRemove} />
      <textarea
       type="text"
       className="task-item__text"
       value={value}
       onChange={handleChange}
       style={{ height }}
      />
      <span className="date">
       {new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
       })}
      </span>
     </div>
    )}
   </Draggable>
  </>
 );
};

export default TaskCard;
