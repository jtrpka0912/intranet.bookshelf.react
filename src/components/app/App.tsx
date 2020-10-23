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
import FileModal from '../project/file-modal/FileModal';

// temp
import Media from '../common/media/Media';

const App = () => {
    return (
        <AppContextProvider>
            <ShelfContextProvider>
                <PageWrapper>
                    <Breadcrumbs />
                    <Directories />
                    <Files />
                    <FileModal />
                </PageWrapper>
            </ShelfContextProvider>
        </AppContextProvider>
    );
}

export default App;