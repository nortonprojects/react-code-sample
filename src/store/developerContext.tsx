import React, { createContext, useReducer } from 'react';

export const DeveloperActions = {
  SET_DEVELOPER_MODE: 'SET_DEVELOPER_MODE',
  SET_RESET: 'SET_RESET',
};
export const DeveloperContext = createContext<any>({});

const developerActionMap = {
  [DeveloperActions.SET_DEVELOPER_MODE]: (state: {mode: boolean, reset: boolean}, action: any) => {
    window.localStorage.setItem('developerMode', action.payload);
    return {...state, mode: action.payload};
  },
  [DeveloperActions.SET_RESET]: (state: {mode: boolean, reset: boolean}, action: any) =>
    ({...state, reset: action.payload})
}

function developerReducer(state: {mode: boolean, reset: boolean}, action: any) {
  try {
    return developerActionMap[action.type](state, action);
  }
  catch {
    return state;
  }
}

function DeveloperProvider({children}: {children: any}) {
  const [developer, developerDispatch] = useReducer(developerReducer, {
    mode: JSON.parse(window.localStorage.getItem('developerMode') || 'false'),
    reset: false,
  });
  return (
    <DeveloperContext.Provider value={{developer, developerDispatch}}>
      {children}
    </DeveloperContext.Provider>
  );
}

export default DeveloperProvider;