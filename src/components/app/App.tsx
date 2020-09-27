// React
import React from 'react';

// Layout
import PageWrapper from '../layout/page/wrapper/PageWrapper';

// Contexts
import AppContextProvider from '../../contexts/AppContext';
import ShelfContextProvider from '../../contexts/ShelfContext';

const App = () => {

    return (
        <AppContextProvider>
            <ShelfContextProvider>
                <PageWrapper>
                    <p>This is page content</p>
                </PageWrapper>
            </ShelfContextProvider>
        </AppContextProvider>
    );
}

export default App;