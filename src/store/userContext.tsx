import React, { createContext, useReducer } from 'react';

export enum Permissions {
  Viewer = 'Viewer',
  Admin = 'Admin',
  Developer = 'Developer',
}

interface UserState {
  name: string,
  email: string,
  permissions: Permissions,
}

const DEFAULT_USER: UserState = {
  name: '',
  email: '',
  permissions: Permissions.Viewer,
}

export const UserActions = {
  LOGIN: 'LOGIN',
  SET_PERMISSIONS: 'SET_PERMISSIONS',
};
export const UserContext = createContext<any>({});

const userActionMap = {
  [UserActions.LOGIN]: (state: UserState, action: any) => {
    return {...action.state}
  },
  [UserActions.SET_PERMISSIONS]: (state: UserState, action: any) => {
    return {...state, permissions: action.state};
  }
}

function userReducer(state: UserState, action: any) {
  try {
    return userActionMap[action.type](state, action);
  }
  catch {
    return state;
  }
}

function UserProvider({children}: {children: any}) {
  const [user, userDispatch] = useReducer(userReducer, DEFAULT_USER);
  return (
    <UserContext.Provider value={{user, userDispatch}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;