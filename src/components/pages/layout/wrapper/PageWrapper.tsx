// React
import React, { useContext } from 'react';

// Contexts
import { AppContext } from '../../../contexts/AppContext';

// Components
import PageHeader from '../header/PageHeader';
import PageSideNav from '../sidenav/PageSideNav';
import PageFooter from '../footer/PageFooter';
import Toast from '../../../common/toast/Toast';
import SpinLoader from '../../../common/spin-loader/SpinLoader';

// Font Awesome
import { faBook } from '@fortawesome/free-solid-svg-icons';

/**
 * @function PageWrapper
 * @summary Page Layout Wrapper
 * @description The layout for all pages for the web app
 * @author J.T.
 * @param { object } props 
 * @returns { React.ReactNode }
 */
const PageWrapper: React.FunctionComponent = (props) => {
    const { isDarkMode } = useContext(AppContext);

    return (
        <main className={ `shelf-layout__wrapper shelf--${isDarkMode ? 'dark' : 'light'}` }>
            <PageSideNav />
            <PageHeader />
            <div className="shelf-layout__content">
                { props.children }
            </div>
            <PageFooter />

            <Toast />
            <SpinLoader icon={ faBook } />
        </main>
    );
};

export default PageWrapper;