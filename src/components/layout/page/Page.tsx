// React
import React from 'react';

// Styles
import './Page.scss';

/**
 * @function PageHeader
 * @summary Page Header Layout
 * @description The header for all pages for the web app
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @returns { JSX }
 */
const PageHeader: React.FunctionComponent = () => {
    return (
        <header className="shelf-page-header">
            <p>This is the header</p>
        </header>
    );
};

/**
 * @function PageFooter
 * @summary Page Footer Layout
 * @description The footer for all pages for the web app
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @returns { JSX }
 */
const PageFooter: React.FunctionComponent = () => {
    return (
        <footer className="shelf-page-footer">
            <p><strong>SHELF</strong> was created by J. Trpka</p>
            <p>&copy; { new Date().getFullYear() }</p>
        </footer>
    );
};

/**
 * @function Page
 * @summary Page Layout Container
 * @description The layout for all pages for the web app
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @param { object } props 
 * @returns { JSX }
 */
const Page: React.FunctionComponent = (props) => {
    return (
        <main className="shelf-page-wrapper">
            <PageHeader />
            <div className="shelf-page-content">
                { props.children }
            </div>
            <PageFooter />
        </main>
    );
};

export default Page;