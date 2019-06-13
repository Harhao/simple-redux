import React,{useReducer} from 'react';
import Provider from './views/Provider';
import Child from './views/child';
import {initialState as store,reducer} from './views/store';
import './App.css';

function App() {
  const [state,dispatch] = useReducer(reducer,store);
  return (
    <div className="App">
      <Provider store={{state,dispatch}}>
        <Child/>
      </Provider>
    </div>
  );
}

export default App;
