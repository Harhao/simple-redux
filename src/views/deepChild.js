import React,{useContext} from 'react';
import {storeContext} from './store';
export default function DeepChild(){
    const {state} = useContext(storeContext);
    return (
        <div>
            {state.user}
        </div>
    )
}