// React
import React, { useContext, useState } from 'react';

// Contexts
import { AppContext } from '../../../contexts/AppContext';
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import ShelfType from '../../../../types/Shelf';

// Components
import Button from '../../../common/button/Button';
import ShelfForm from '../../../project/shelf-form/ShelfForm';
import ShelfModal from '../../../project/shelf-modal/ShelfModal';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faClone, faFolder } from '@fortawesome/free-solid-svg-icons';

/**
 * @function PageSideNav
 * @summary Page Sliding Side Navigation Layout
 * @description A sliding side nav "drawer" that goes in and out of app.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const PageSideNav: React.FunctionComponent = () => {
    // Context
    const { isSideNavOpen, toggleSideNav } = useContext(AppContext);
    const { shelves, activeShelf, setToActiveShelf } = useContext(ShelfContext);

    // States
    const [shelfModalOpen, toggleShelfModal] = useState(false);

    /**
     * @function onClickShelfItem
     * @event onClick
     * @description Set a shelf to be the active shelf (and display its items)
     * @author J.T.
     * @param { ShelfType } shelf
     */
    const onClickShelfItem = (shelf: ShelfType) => {
        // Close the side-nav
        toggleSideNav(!isSideNavOpen);

        // Then set the active shelf
        setToActiveShelf(shelf);
    };
    
    return (
        <aside className={ `shelf-layout__sidebar ${ isSideNavOpen ? 'shelf-layout__sidebar--opened' : 'shelf-layout__sidebar--closed' }`}>
            <section className="shelf-layout__sidebar__shelves">
                <FontAwesomeIcon className="shelf-layout__sidebar__closebutton" 
                    icon={ faWindowClose } 
                    onClick={ () => toggleSideNav(!isSideNavOpen) }
                />
                <h3>Shelves</h3>

                <ul className="shelf-shelves no-bullets">
                    { shelves.length === 0 ? <li>Currently no shelves available</li> : null }
                    { shelves.map((item) => {
                        return (
                            <li key={item._id} 
                                className={`shelf-shelves__item ${ activeShelf?._id === item._id ? 'shelf-shelves__item--active' : '' }`}
                                onClick={ () => onClickShelfItem(item) }
                            >
                                <div className="shelf-shelves__item__name">
                                    {item.name}
                                </div>
                                
                                <div className="shelf-shelves__item__icons">
                                    { item.multiFile ? <span title="Multi-File"
                                    className="shelf-shelves__item__icons--multifile">
                                        <FontAwesomeIcon icon={ faClone } />
                                    </span> : null }
                                    
                                    { item.showDirectories ? <span title="Shows Directories" className="shelf-shelves__item__icons--showdirectories">
                                        <FontAwesomeIcon icon={ faFolder } />
                                    </span> : null }
                                </div>
                            </li>  
                        ); 
                    }) }
                </ul>
                    
                { activeShelf ? <Button rounded block onClick={ () => toggleShelfModal(true) }>Edit { activeShelf.name }</Button> : null}
            </section>

            <section className="shelf-page-sidebar-form">
                <h3>Create Shelf</h3>
                <ShelfForm buttonLabel="Create New Shelf" />
            </section>

            <ShelfModal onClickToggle={ () => toggleShelfModal(!shelfModalOpen) } open={ shelfModalOpen } />
        </aside>
    );
};

export default PageSideNav;