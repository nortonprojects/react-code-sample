import React, { useState, useContext } from 'react';
import Popover from 'react-tiny-popover';

import ProfileMenu from './profileMenu';
import { UserContext } from '../store/userContext';

export default function Header() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const {user} = useContext(UserContext);

  return (
    <header className="h-16 w-full flex justify-between px-4 py-4">
      <div>
        <p className="text-white text-2xl">Dashboard</p>
      </div>
      <div>
        <Popover isOpen={isPopoverOpen} position={'bottom'} onClickOutside={() => setIsPopoverOpen(false)} content={(
          <ProfileMenu/>
        )}>
          <div className="flex">
            <p className="text-palette-white mr-2 h-8 leading-loose">{user.name || 'Name'}</p>
            <div className="rounded-full h-8 w-8 bg-palette-black" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            </div>
          </div>
        </Popover>
      </div>
    </header>
  );
}