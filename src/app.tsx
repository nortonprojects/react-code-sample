import React from 'react';

import DeveloperProvider from './store/developerContext';
import Header from './structure/header';
import Main from './main/main';
import UserModal from './structure/userModal';
import DeveloperMenu from './developer/developerMenu';
import UserProvider from './store/userContext';

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <DeveloperProvider>
        <UserProvider>
          <DeveloperMenu/>
          <Header/>
          <Main/>
          <UserModal/>
        </UserProvider>
      </DeveloperProvider>
    </div>
  );
}
