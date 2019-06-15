import React,{useContext} from 'react';
import {storeContext} from './store';
import useConnect  from './connect';
export default function DeepChild(){
    // const {state} = useContext(storeContext);
    const {state} = useConnect(storeContext);
    return (
        <div>
            {state.user}
        </div>
    )
}