import {useContext} from 'react';
export default function useConnect(props){
    // return useContext(props);
    const {state,dispatch} = useContext(props);
    return {state,dispatch}
}