import React,{useContext} from 'react';
import {storeContext} from './store';
import DeepChild from './deepChild';
function Child() {
    const {state,dispatch}= useContext(storeContext);
    return (
        <div className="child">
            <p>姓名:{state.user}</p>
            <p>年龄:{state.age}</p>
            <button onClick={()=>dispatch({type:'CHANGENAME'})}>changeName</button>
            deep child:
            <DeepChild/>
        </div>

    );
}

export default Child;