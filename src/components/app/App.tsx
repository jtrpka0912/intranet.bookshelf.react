// React
import React, { useContext } from 'react';

// Layout
import PageWrapper from '../layout/page/wrapper/PageWrapper';

// Contexts
import AppContextProvider from '../../contexts/AppContext';
import ShelfContextProvider from '../../contexts/ShelfContext';

const App = () => {
  return (
    <AppContextProvider>
      <PageWrapper>
        <ShelfContextProvider>
          <p>This is page content</p>
        </ShelfContextProvider>
      </PageWrapper>
    </AppContextProvider>
  );
}

export default App;