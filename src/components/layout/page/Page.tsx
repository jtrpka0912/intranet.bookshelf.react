// React
import React from 'react';

// Styles
import './Page.scss';

const PageSidebar: React.FunctionComponent = () => {
    return (
        <aside className="shelf-page-sidebar">
            <section className="shelf-page-sidebar-shelves">
                <h3>Shelves</h3>
                <ul>
                    <li>Books</li>
                    <li>Magazines</li>
                    <li>Comic Books</li>
                    <li>Game Books</li>
                </ul>
            </section>

            <section className="shelf-page-sidebar-shelf-form">
                <label>
                    <input type="text" placeholder="Name of shelf" />
                </label>

                <label>
                    <input type="checkbox" /> Show Directories
                    <input type="checkbox" /> Multi-File
                </label>

                <input type="submit" value="Create New Shelf" />
            </section>
        </aside>
    );
}

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
            <div className="shelf-page-header-title">
                <h1>SHELF</h1>
            </div>

            <nav className="shelf-page-header-links">
                <ul>
                    <li>Dark Mode</li>
                    <li>Login</li>
                    <li>Sign Up</li>
                </ul>
            </nav>
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
            <PageSidebar />
            <PageHeader />
            <div className="shelf-page-content">
                { props.children }
            </div>
            <PageFooter />
        </main>
    );
};

export default Page;