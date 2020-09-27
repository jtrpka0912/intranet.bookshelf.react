// React
import React from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Styles
import './PageHeader.scss';

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
            <div className="shelf-page-header-sidebutton">
                <FontAwesomeIcon icon={ faBars } />
            </div>

            <div className="shelf-page-header-title">
                <h1>SHELF</h1>
            </div>

            <nav className="shelf-page-header-links">
                <ul className="no-bullets">
                    <li>Dark Mode</li>
                    <li>Login</li>
                    <li>Sign Up</li>
                </ul>
            </nav>
        </header>
    );
};

export default PageHeader;