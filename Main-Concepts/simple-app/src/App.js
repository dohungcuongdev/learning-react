import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestTableAndForm from './TestTableAndForm';
import TestGetAPI from './TestGetAPI';
import TestStateLifecycle from './TestStateLifecycle';
import TestHandlingEvents from './TestHandlingEvents';
import TestConditionalRendering from './TestConditionalRendering';
import TestListsKeys from './TestListsKeys';
import TestHandleForms from './TestHandleForms';
import TestLiftingStateUp from './TestLiftingStateUp';
import TestComposition from './TestComposition';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <TestTableAndForm />
      <TestGetAPI/>
      <TestStateLifecycle/>
      <TestHandlingEvents/>
      <TestConditionalRendering/>
      <TestListsKeys/>
      <TestHandleForms/>
      <TestLiftingStateUp/>
      <TestComposition/>
    </div>
  );
}

export default App;
