// React
import React, { useContext, useEffect } from 'react';

// Styles
import './PageSideNav.scss';

// Components
import ShelfForm from '../../../project/shelf-form/ShelfForm';

// Contexts
import { AppContext } from '../../../../contexts/AppContext';

// Types
import ShelfType from '../../../../types/Shelf';

/**
 * @function PageSideNav
 * @summary Page Sliding Side Navigation Layout
 * @description A sliding side nav "drawer" that goes in and out of app.
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @returns { JSX }
 */
const PageSideNav: React.FunctionComponent = () => {
    // Context
    const { availableShelves } = useContext(AppContext);
    
    return (
        <aside className="shelf-page-sidebar opened">
            <section className="shelf-page-sidebar-shelves">
                <h3>Shelves</h3>

                <ul className="no-bullets">
                    { availableShelves.map((item) => {
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