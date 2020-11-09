// React
import React from 'react';

// Layout
import PageWrapper from '../pages/layout/wrapper/PageWrapper';

// Contexts
import AppContextProvider from '../contexts/AppContext';
import ShelfContextProvider from '../contexts/ShelfContext';

// Components
import Breadcrumbs from '../project/list-section/Breadcrumbs';
import Directories from '../project/list-section/Directories';
import Files from '../project/list-section/Files';
import SpinLoader from '../common/spin-loader/SpinLoader';

// Font Awesome
import { faBook } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    return (
        <AppContextProvider>
            <ShelfContextProvider>
                <SpinLoader icon={ faBook } />
                <PageWrapper>
                    <Breadcrumbs />
                    <Directories />
                    <Files />
                </PageWrapper>
            </ShelfContextProvider>
        </AppContextProvider>
    );
}

export default App;