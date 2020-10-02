// React
import React from 'react';

// Styles
import './PageFooter.scss';

/**
 * @function PageFooter
 * @summary Page Footer Layout
 * @description The footer for all pages for the web app
 * @author J.T.
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

export default PageFooter;