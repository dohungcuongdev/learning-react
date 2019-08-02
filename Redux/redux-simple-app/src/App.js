import React, { useState } from "react";
import TodosApp from './components/TodosApp';

function App() {

  const [todosAppIsDisplayed, toggleTodosAppIsDisplayed] = useState(false);
  return (
    <div className="App">
      <button onClick={() => toggleTodosAppIsDisplayed(!todosAppIsDisplayed)}>{todosAppIsDisplayed?'Unmount Todos App':'Mount Todos App'}</button>
      {todosAppIsDisplayed && <TodosApp/>}
    </div>
  );
}

export default App;
