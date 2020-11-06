// React
import React from 'react';

// Components
import PageHeader from '../header/PageHeader';
import PageSideNav from '../sidenav/PageSideNav';
import PageFooter from '../footer/PageFooter';
import Toast from '../../../common/toast/Toast';

/**
 * @function PageWrapper
 * @summary Page Layout Wrapper
 * @description The layout for all pages for the web app
 * @author J.T.
 * @param { object } props 
 * @returns { React.ReactNode }
 */
const PageWrapper: React.FunctionComponent = (props) => {
    return (
        <main className="shelf-layout__wrapper shelf--light">
            <PageSideNav />
            <PageHeader />
            <div className="shelf-layout__content">
                { props.children }
            </div>
            <PageFooter />
            <Toast />
        </main>
    );
};

export default PageWrapper;