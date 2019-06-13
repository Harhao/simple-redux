import React from 'react';
export const initialState = {
    user:'kiwis',
    age:23
}
export const reducer = (state, action)=>{
    switch (action.type) {
      case 'CHANGENAME':
        return {user:'harhao',age:24}
      default:
        return initialState;
    }
}
export const storeContext = React.createContext();