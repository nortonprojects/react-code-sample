import React, {useContext} from 'react';
 
import {DeveloperContext, DeveloperActions} from '../store/developerContext';
import {UserContext, UserActions, Permissions} from '../store/userContext';

 
export default function DeveloperMenu() {
  const {developer, developerDispatch} = useContext(DeveloperContext);
  const {user, userDispatch} = useContext(UserContext);

  return developer.mode ? (
    <div className="w-full h-12 bg-palette-teal px-4 py-2">
      <button className="bg-palette-white shadow px-2 py-1 mx-2 rounded"
            onClick={() => developerDispatch({type: DeveloperActions.SET_RESET, payload: true})}>
        Reset Data
      </button>
      <label>
        Change Permissions
        <select className="bg-palette-white shadow px-2 py-1 mx-2 rounded"
                value={user.permissions}
                onChange={(event) => userDispatch({type: UserActions.SET_PERMISSIONS, state: event.target.value})}>
          {(
            Object.keys(Permissions).filter((item) => isNaN(Number(item))).map((item) =>
              <option value={item} key={item}>{item}</option>
          ))}
        </select>
      </label>
    </div>
  ) : null;
}
