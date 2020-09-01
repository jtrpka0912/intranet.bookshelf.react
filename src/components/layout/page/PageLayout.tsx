// React
import React from 'react';

/**
 * @function PageLayout
 * @summary The page layout for the web app.
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @param { object } props 
 * @returns { JSX }
 */
const PageLayout: React.FunctionComponent = (props) => {
    return (
        <main className="shelf-page-container">
            { props.children }
        </main>
    );
};

export default PageLayout;