// React
import React from 'react';

/**
 * @function PageFooter
 * @summary Page Footer Layout
 * @description The footer for all pages for the web app
 * @author J.T.
 * @returns { React.ReactNode }
 */
const PageFooter: React.FunctionComponent = () => {
    return (
        <footer className="shelf-layout__footer">
            <p><strong>SHELF</strong> was created by J. Trpka</p>
        </footer>
    );
};

export default PageFooter;