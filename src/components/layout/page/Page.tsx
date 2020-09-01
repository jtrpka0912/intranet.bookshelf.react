// React
import React from 'react';


/**
 * @function Page
 * @summary Main page layout
 * @description The layout for all pages for this web app
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @param { object } props 
 * @returns { JSX }
 */
const Page: React.FunctionComponent = (props) => {
    return (
        <main className="shelf-page-wrapper">
            { props.children };
        </main>
    );
};

export default Page;