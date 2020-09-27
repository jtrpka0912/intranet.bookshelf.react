// React
import React from 'react';

// Layout
import PageWrapper from '../layout/page/wrapper/PageWrapper';

// Contexts
import ShelfContextProvider from '../../contexts/ShelfContext';

const App = () => {

    return (
        <ShelfContextProvider>
            <PageWrapper>
                <p>This is page content</p>
            </PageWrapper>
        </ShelfContextProvider>
    );
}

export default App;