// React
import React, { useContext } from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Context
import { AppContext } from '../../../../contexts/AppContext';

// Styles
import './PageHeader.scss';

/**
 * @function PageHeader
 * @summary Page Header Layout
 * @description The header for all pages for the web app
 * @author J.T.
 * @returns { React.ReactNode }
 */
const PageHeader: React.FunctionComponent = () => {
    // Context
    const { isSideNavOpen, toggleSideNav } = useContext(AppContext);
    return (
        <header className="shelf-page-header">
            <div className="shelf-page-header-sidebutton">
                <FontAwesomeIcon onClick={ () => toggleSideNav(!isSideNavOpen) } icon={ faBars } />
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