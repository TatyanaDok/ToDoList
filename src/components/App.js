import '../../src/App.css';

import Boards from './Boards';

function App() {
 return (
  <div className="App">
   <h1 className="title">ToDoList</h1>
   <div className="boards">
    <Boards />
   </div>
  </div>
 );
}

export default App;
