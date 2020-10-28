import React from 'react';
import BtnDemo from './components/Button/demo'
import AlertDemo from './components/Alert/demo'
import SelectDemo from './components/Select/demo'
import IconDemo from './components/Icon/demo'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BtnDemo />
        <AlertDemo />
        <SelectDemo />
        <IconDemo />
        <h1>h1</h1>
        <h2>h2</h2>
        <h3>h3</h3>
        <h4>h4</h4>
        <h5>h5</h5>
        <h6>h6</h6>
        <code>
          const a = b
        </code>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
    </div>
  );
}

export default App;
