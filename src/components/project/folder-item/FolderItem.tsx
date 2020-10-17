// React
import React, { useContext } from 'react';

// Components
import Item from '../../common/item/Item';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import DirectoryType from '../../../types/Directory';

// Font Awesome
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

// Styles
import './FolderItem.scss';

/**
 * @interface FolderItemProps
 * @description The acceptable props for the Folder Item component
 * @author J.T.
 * @property { string } className
 * @property { DirectoryType } directory
 * @property { boolean } opened 
 */
interface FolderItemProps {
    className?: string,
    directory: DirectoryType,
    opened: boolean
}

/**
 * @function FolderItem
 * @summary Folder Item Component
 * @description A folder item represents a directory in the shelf.
 * @author J.T.
 * @return { React.ReactNode }
 */
const FolderItem: React.FunctionComponent<FolderItemProps> = (props) => {
    const { setToActiveDirectory } = useContext(ShelfContext);

    /**
     * @function onClickCurrentDirectory
     * @event onClick
     * @description Set the current directory in state
     * @author J.T.
     */
    const onClickCurrentDirectory = () => {
        setToActiveDirectory(props.directory);
    }

    return (
        <Item className={ `shelf-folderitem ${ props.className }` }
            icon={ props.opened ? faFolderOpen : faFolder }    
            onClick={ onClickCurrentDirectory }
        >{ props.directory.name }</Item>
    )
};

export default FolderItem;