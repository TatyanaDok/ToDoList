function ButtonAdd({ addTask, boardId }) {
 function handleAddTask() {
  addTask(boardId);
 }

 return (
  <button className="button__add " onClick={handleAddTask}>
   + Add New Task
  </button>
 );
}

export default ButtonAdd;
