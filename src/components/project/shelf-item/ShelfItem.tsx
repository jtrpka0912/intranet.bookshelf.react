// React
import React, { useContext } from 'react';

// Components
import Tile from '../../common/item/Item';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import ShelfType from '../../../types/Shelf';

// Font Awesome
// TODO: Not a fan with this icon; lets pick another to represent a shelf.
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

// Styles
import './ShelfItem.scss';

/**
 * @interface ShelfItemProps
 * @description The acceptable props for the ShelfTile component
 * @author J.T.
 * @property { string } className
 * @property { ShelfType } shelf
 */
interface ShelfItemProps {
    className?: string,
    shelf: ShelfType
}

/**
 * @function ShelfItem
 * @summary Shelf Item Component
 * @description A shelf item represents the root of a shelf.
 * @author J.T.
 * @return { React.ReactNode }
 */
const ShelfItem: React.FunctionComponent<ShelfItemProps> = (props) => {
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
        <Tile className={ `shelf-shelfitem ${ props.className }` }
            icon={ faFolderPlus }
            onClick={ onClickCurrentShelf }
        >{ props.shelf.name }</Tile>
    )
};

export default ShelfItem;