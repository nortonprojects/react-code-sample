import React, { useContext } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

import {DeveloperContext, DeveloperActions} from '../store/developerContext';
import {UserContext, UserActions, Permissions} from '../store/userContext';

export default function ProfileMenu() {
  const {developer, developerDispatch} = useContext(DeveloperContext);
  const {user, userDispatch} = useContext(UserContext);

  return (
    <div className="bg-palette-black text-palette-white p-4 w-48 text-center">
      <p className="align-right">{user.email || 'Email'}</p>
      {user.permissions === Permissions.Developer &&
        <label className="mt-2">
          <span>Developer Mode</span>
          <Toggle defaultChecked={developer.mode} onChange={() => developerDispatch({type: DeveloperActions.SET_DEVELOPER_MODE, payload: !developer.mode})} />
        </label>
      }
    </div>
  );
}
