// React
import React from 'react';

// Layout
import PageWrapper from '../pages/layout/wrapper/PageWrapper';

// Contexts
import AppContextProvider from '../../contexts/AppContext';
import ShelfContextProvider from '../../contexts/ShelfContext';

// Components
import Breadcrumbs from '../project/list-section/Breadcrumbs';
import Directories from '../project/list-section/Directories';
import Files from '../project/list-section/Files';

// Temporary Components
import Modal, { Size } from '../../components/common/modal/Modal';


const App = () => {
    return (
        <AppContextProvider>
            <ShelfContextProvider>
                <PageWrapper>
                    <Breadcrumbs />
                    <Directories />
                    <Files />
                </PageWrapper>
                
                <Modal size={ Size.Large } slide={true}>Hello There</Modal>
            </ShelfContextProvider>
        </AppContextProvider>
    );
}

export default App;