// React
import React from 'react';

// Styles
import './PageSideNav.scss';

// Components
import Button from '../../../common/button/Button';

/**
 * @function PageSideNav
 * @summary Page Sliding Side Navigation Layout
 * @description A sliding side nav "drawer" that goes in and out of app.
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @returns { JSX }
 */
const PageSideNav: React.FunctionComponent = () => {
    return (
        <aside className="shelf-page-sidebar closed">
            <section className="shelf-page-sidebar-shelves">
                <h3>Shelves</h3>

                <ul className="no-bullets">
                    <li>Books</li>
                    <li>Magazines</li>
                    <li>Comic Books</li>
                    <li>Game Books</li>
                </ul>
            </section>

            <section className="shelf-page-sidebar-shelf-form">
                <h3>Create Shelf</h3>

                <label>
                    <input type="text" placeholder="Name of shelf" />
                </label>

                <label>
                    <input type="checkbox" /> Show Directories
                </label>

                <label>
                    <input type="checkbox" /> Multi-File
                </label>

                <Button type="submit" block={true} rounded={true}>Create New Shelf</Button>
            </section>
        </aside>
    );
};

export default PageSideNav;