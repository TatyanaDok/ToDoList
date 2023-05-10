import React, { useState, useEffect } from 'react';
import { boardsData } from './BoardsData';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import ButtonAdd from './ButtonAdd';

const Boards = () => {
 const [boards, setBoards] = useState(
  JSON.parse(localStorage.getItem('myBoards')) || boardsData
 );
 useEffect(() => {
  localStorage.setItem('myBoards', JSON.stringify(boards));
 }, [boards]);
 function onDragEnd(result) {
  if (!result.destination) return;

  const { source, destination } = result;
  const sourceBoard = boards[source.droppableId];
  const destBoard = boards[destination.droppableId];
  const sourceItems = [...sourceBoard.items];
  const destItems = [...destBoard.items];
  const [removed] = sourceItems.splice(source.index, 1);
  destItems.splice(destination.index, 0, removed);
  const newBoards =
   source.droppableId !== destination.droppableId
    ? {
       ...boards,
       [source.droppableId]: { ...sourceBoard, items: sourceItems },
       [destination.droppableId]: { ...destBoard, items: destItems },
      }
    : {
       ...boards,
       [source.droppableId]: { ...sourceBoard, items: destItems },
      };
  setBoards(newBoards);
 }

 const addNewTask = (columnName) => {
  setBoards((prevState) => {
   const newItems = [
    ...prevState[columnName].items,
    {
     id: Date.now().toString(),
     name: `Задача ${prevState[columnName].items.length + 1}`,
    },
   ];
   return {
    ...prevState,
    [columnName]: { ...prevState[columnName], items: newItems },
   };
  });
 };
 function removeTask(columnId, itemId) {
  setBoards((prevState) => ({
   ...prevState,
   [columnId]: {
    ...prevState[columnId],
    items: prevState[columnId].items.filter((item) => item.id !== itemId),
   },
  }));
 }

 function updateTask(columnId, itemId, value) {
  const updatedColumns = {
   ...boards,
   [columnId]: {
    ...boards[columnId],
    items: boards[columnId].items.map((item) => {
     if (item.id === itemId) {
      return {
       ...item,
       name: value,
      };
     }
     return item;
    }),
   },
  };
  setBoards(updatedColumns);
 }
 return (
  <>
   <DragDropContext
    onDragEnd={(result) => onDragEnd(result, boards, setBoards)}
   >
    {Object.entries(boards).map(([boardId, board]) => {
     return (
      <Droppable key={boardId} droppableId={boardId}>
       {(provided) => (
        <div
         className="board"
         ref={provided.innerRef}
         {...provided.droppableProps}
        >
         <h3 className="board__title">{board.title}</h3>

         {board.items.map((item, index) => (
          <TaskCard
           key={item.id}
           item={item}
           index={index}
           removeTask={removeTask}
           boardId={boardId}
           updateTask={updateTask}
          />
         ))}
         {provided.placeholder}
         <ButtonAdd addTask={addNewTask} boardId={boardId} />
        </div>
       )}
      </Droppable>
     );
    })}
   </DragDropContext>
  </>
 );
};

export default Boards;
