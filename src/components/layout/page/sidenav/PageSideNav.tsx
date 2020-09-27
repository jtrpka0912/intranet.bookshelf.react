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
    const { shelves, activeShelf } = useContext(ShelfContext);
    
    return (
        <aside className="shelf-page-sidebar opened">
            <section className="shelf-page-sidebar-shelves">
                <h3>Shelves</h3>

                <ul className="shelf-shelves-listing no-bullets">
                    { shelves.map((item) => {
                        // NOTE: This might be in a separate component. Not sure...
                        // TODO: Need to show a marker that this shelf is the current shelf
                        // TODO: Need to add onClick events to change current shelf
                        return (
                            <li key={item._id} className={`shelves-item ${ activeShelf?._id === item._id ? 'active' : '' }`}>
                                <div className="shelves-item-name">
                                    {item.name}
                                </div>
                                
                                <div className="shelves-item-icons">
                                    { item.multiFile ? <span className="shelves-item-icons-multifile">m</span> : null }
                                    { item.showDirectories ? <span className="shelves-item-icons-showdirectories">d</span> : null }
                                    <span className="shelves-item-icons-info">i</span>
                                </div>
                            </li>  
                        ); 
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