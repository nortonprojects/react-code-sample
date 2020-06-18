import React, {useState, useContext} from 'react';
import Modal from 'react-modal';

import Panel from '../main/panel';
import {UserContext, UserActions, Permissions} from '../store/userContext';
import {DeveloperContext, DeveloperActions} from '../store/developerContext';

export default function UserModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const {user, userDispatch} = useContext(UserContext);
  const [userData, setUserData] = useState(user);
  const {developerDispatch} = useContext(DeveloperContext);
  Modal.setAppElement('#root');

  function handleChange(field: string) {
    return (event: any) =>
      setUserData({...userData, [field]: event.target.value || 0})
  }

  function handleSave() {
    userDispatch({type: UserActions.LOGIN, state: userData});
    developerDispatch({type: DeveloperActions.SET_RESET, payload: true});
    setIsModalOpen(false);
  }

  return (
    <Modal className="border border-palette-black rounded-lg bg-palette-blue m-32 px-8 py-12 shadow-lg" isOpen={isModalOpen} contentLabel="Minimal Modal Example">
      <Panel colSpan={0}>
        <label className="mb-4 w-full">
          Name
          <input type="text" value={userData.name} onChange={handleChange('name')}
                  className="shadow-lg w-full bg-palette-gray px-4 py-2 rounded-lg border border-palette-black"/>
        </label>
        <label className="mb-4 w-full">
          Email
          <input type="email" value={userData.email} onChange={handleChange('email')}
                  className="shadow-lg w-full bg-palette-gray px-4 py-2 rounded-lg border border-palette-black"/>
        </label>
        <label className="mb-4 w-full">
          Permissions
          <select name="permissions" value={userData.permissions} onChange={handleChange('permissions')}
                  className="shadow-lg w-full px-4 py-2 rounded-lg bg-palette-gray border border-palette-black">
            {(
              Object.keys(Permissions).filter((item) => isNaN(Number(item))).map((item) =>
                <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </label>
      </Panel>
      <button className="shadow-lg mt-4 border border-palette-black rounded-lg bg-palette-gray px-4 py-2" onClick={handleSave}>Save</button>
    </Modal>
  );
}