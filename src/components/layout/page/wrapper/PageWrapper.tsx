// React
import React from 'react';

// Components
import PageHeader from '../header/PageHeader';
import PageSideNav from '../sidenav/PageSideNav';
import PageFooter from '../footer/PageFooter';

// Styles
import './PageWrapper.scss';

/**
 * @function PageWrapper
 * @summary Page Layout Wrapper
 * @description The layout for all pages for the web app
 * @author J.T.
 * @param { object } props 
 * @returns { JSX }
 */
const PageWrapper: React.FunctionComponent = (props) => {
    return (
        <main className="shelf-page-wrapper">
            <PageSideNav />
            <PageHeader />
            <div className="shelf-page-content">
                { props.children }
            </div>
            <PageFooter />
        </main>
    );
};

export default PageWrapper;