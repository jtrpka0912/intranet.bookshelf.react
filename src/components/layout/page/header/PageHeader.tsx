/**
 * @function PageHeader
 * @summary Page Header Layout
 * @description The header for all pages for the web app
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @returns { JSX }
 */
// React
import React from 'react';

// Styles
import './PageHeader.scss';

// Components
import Button from '../../../common/button/Button';

const PageHeader: React.FunctionComponent = () => {
    return (
        <header className="shelf-page-header">
            <div className="shelf-page-header-sidebutton">
                <Button type="button">|||</Button>    
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