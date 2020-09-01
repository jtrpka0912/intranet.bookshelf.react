// React
import React from 'react';

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
            <p>This is the footer</p>
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
            { props.children };
            <PageFooter />
        </main>
    );
};

export default Page;