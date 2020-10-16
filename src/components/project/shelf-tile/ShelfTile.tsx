// React
import React, { useContext } from 'react';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import ShelfType from '../../../types/Shelf';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// TODO: Not a fan with this icon; lets pick another to represent a shelf.
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

// Styles
import './ShelfTile.scss';

/**
 * @interface ShelfTileProps
 * @description The acceptable props for the ShelfTile component
 * @author J.T.
 * @property { ShelfType } shelf
 * @property { boolean } opened 
 */
interface ShelfTileProps {
    shelf: ShelfType,
}

/**
 * @function ShelfTile
 * @summary Shelf Tile Component
 * @description A shelf tile represents the root of the shelf.
 * @author J.T.
 * @return { React.ReactNode }
 */
const ShelfTile: React.FunctionComponent<ShelfTileProps> = (props) => {
    const { setToActiveShelf } = useContext(ShelfContext);

    /**
     * @function onClickCurrentShelf
     * @event onClick
     * @description Set the current shelf in state
     * @author J.T.
     */
    const onClickCurrentShelf = () => {
        setToActiveShelf(props.shelf);
    }
    
    return (
        <div className="shelf-tile-wrapper shelf-tile-shelf">
            <div className="shelf-tile-icon" onClick={ onClickCurrentShelf }>
                <FontAwesomeIcon icon={ faFolderPlus } />
            </div>

            <h3 className="shelf-tile-name">{ props.shelf.name }</h3>
        </div>
    );
};

export default ShelfTile;