// React
import React from 'react';

// Layout
import PageWrapper from '../layout/page/wrapper/PageWrapper';

// Contexts
import AppContextProvider from '../../contexts/AppContext';
import ShelfContextProvider from '../../contexts/ShelfContext';
import Modal from '../../components/common/modal/Modal';

const App = () => {

    return (
        <AppContextProvider>
            <ShelfContextProvider>
                <PageWrapper>
                    <p>This is page content</p>
                </PageWrapper>
                <Modal fade={ true }>Hello There</Modal>
            </ShelfContextProvider>
        </AppContextProvider>
    );
}

export default App;