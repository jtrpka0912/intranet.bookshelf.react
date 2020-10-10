// React
import React from 'react';

// Layout
import PageWrapper from '../layout/page/wrapper/PageWrapper';

// Contexts
import AppContextProvider from '../../contexts/AppContext';
import ShelfContextProvider from '../../contexts/ShelfContext';
import Modal, { Size } from '../../components/common/modal/Modal';
import FolderTile from '../../components/project/folder-tile/FolderTile';

const App = () => {
    const mockBreadcrumbsStyles = {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        width: '90vw',
        margin: '0 auto'
    };

    return (
        <AppContextProvider>
            <ShelfContextProvider>
                <PageWrapper>
                    <p>This is page content</p>
                    <div style={ mockBreadcrumbsStyles }>
                        <FolderTile />
                        <FolderTile />
                        <FolderTile />
                        <FolderTile />
                        <FolderTile />
                        <FolderTile />
                        <FolderTile />
                        <FolderTile />
                        <FolderTile />
                        <FolderTile />
                    </div>
                </PageWrapper>
                
                <Modal size={ Size.Large } slide={true}>Hello There</Modal>
            </ShelfContextProvider>
        </AppContextProvider>
    );
}

export default App;