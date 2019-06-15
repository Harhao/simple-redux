import React,{useContext} from 'react';
import {storeContext} from './store';
import DeepChild from './deepChild';
import useConnect from './connect';
function Child() {
    const {state,dispatch}= useConnect(storeContext);
    return (
        <div className="child">
            <p>姓名:{state.user}</p>
            <p>年龄:{state.age}</p>
            <button onClick={()=>dispatch({type:'CHANGENAME'})}>changeName</button>
            <p>deep child:</p>
            <DeepChild/>
        </div>

    );
}

export default Child;