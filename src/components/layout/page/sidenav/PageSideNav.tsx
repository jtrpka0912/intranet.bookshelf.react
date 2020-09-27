// React
import React, { useContext } from 'react';

// Styles
import './PageSideNav.scss';

// Components
import ShelfForm from '../../../project/shelf-form/ShelfForm';

// Contexts
import { ShelfContext } from '../../../../contexts/ShelfContext';

/**
 * @function PageSideNav
 * @summary Page Sliding Side Navigation Layout
 * @description A sliding side nav "drawer" that goes in and out of app.
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @returns { JSX }
 */
const PageSideNav: React.FunctionComponent = () => {
    // Context
    const { shelves } = useContext(ShelfContext);
    
    return (
        <aside className="shelf-page-sidebar opened">
            <section className="shelf-page-sidebar-shelves">
                <h3>Shelves</h3>

                <ul className="no-bullets">
                    { shelves.map((item) => {
                        // TODO: Need to show a marker that this shelf is the current shelf
                        // TODO: Need to add onClick events to change current shelf
                        // TODO: Need to add markers to show that it shows directories and/or multi-file
                        return <li key={item._id}>{item.name}</li>  
                    }) }
                </ul>
            </section>

            <section className="shelf-page-sidebar-form">
                <ShelfForm buttonLabel="Create New Shelf" title="Create Shelf" />
            </section>
        </aside>
    );
};

export default PageSideNav;