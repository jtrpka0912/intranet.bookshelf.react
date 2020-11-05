// React
import React, { useContext } from 'react';

// Context
import { ListViews } from '../../contexts/AppContext';
import { ShelfContext } from '../../contexts/ShelfContext';

// Types
import DirectoryType from '../../../types/Directory';

// Components
import Item from '../../common/item/Item';

// Font Awesome
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';


/**
 * @interface FolderItemProps
 * @description The acceptable props for the Folder Item component
 * @author J.T.
 * @property { DirectoryType } directory
 * @property { ListViews } display
 * @property { boolean } opened 
 */
interface FolderItemProps {
    directory: DirectoryType,
    display: ListViews,
    opened: boolean
}

/**
 * @function FolderItem
 * @summary Folder Item Component
 * @description A folder item that represents a directory in the shelf.
 * @author J.T.
 * @return { React.ReactNode }
 */
const FolderItem: React.FunctionComponent<FolderItemProps> = (props) => {
    const { setToActiveDirectory } = useContext(ShelfContext);

    return (
        <Item className="shelf-folderitem"
            display={ props.display }
            icon={ props.opened ? faFolderOpen : faFolder }    
            onClick={ () => setToActiveDirectory(props.directory) }
        >{ props.directory.name }</Item>
    )
};

export default FolderItem;