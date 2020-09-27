// React
import React, { useContext } from 'react';

// Styles
import './PageSideNav.scss';

// Components
import ShelfForm from '../../../project/shelf-form/ShelfForm';

// Contexts
import { ShelfContext } from '../../../../contexts/ShelfContext';

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
    const { shelves, activeShelf, setToActiveShelf } = useContext(ShelfContext);

    /**
     * @function onClickShelfItem
     * @event onClick
     * @description Set a shelf to be the active shelf (and display its items)
     * @author J. Trpka <jtrpka0912@gmail.com>
     * @param { ShelfType } shelf
     */
    const onClickShelfItem = (shelf: ShelfType) => {
        setToActiveShelf(shelf);
    };
    
    return (
        <aside className="shelf-page-sidebar opened">
            <section className="shelf-page-sidebar-shelves">
                <h3>Shelves</h3>

                <ul className="shelves-listing no-bullets">
                    { shelves.map((item) => {
                        // NOTE: This might be in a separate component. Not sure...
                        return (
                            <li key={item._id} 
                                className={`shelves-item ${ activeShelf?._id === item._id ? 'active' : '' }`}
                                onClick={ () => onClickShelfItem(item) }
                            >
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