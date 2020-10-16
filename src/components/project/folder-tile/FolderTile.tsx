// React
import React, { useContext } from 'react';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import DirectoryType from '../../../types/Directory';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

// Styles
import './FolderTile.scss';

/**
 * @interface FolderTileProps
 * @description The acceptable props for the FolderTile component
 * @author J.T.
 * @property { DirectoryType } directory
 * @property { boolean } opened 
 */
interface FolderTileProps {
    directory: DirectoryType,
    opened: boolean
}

/**
 * @function FolderTile
 * @summary Folder Tile Component
 * @description A folder tile represents a directory in the shelf.
 * @author J.T.
 * @return { React.ReactNode }
 */
const FolderTile: React.FunctionComponent<FolderTileProps> = (props) => {
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
        <div className="shelf-tile-wrapper shelf-tile-folder">
            <div className="shelf-tile-icon" onClick={ onClickCurrentDirectory }>
                <FontAwesomeIcon icon={ props.opened ? faFolderOpen : faFolder } />
            </div>

            <h3 className="shelf-tile-name">{ props.directory.name }</h3>
        </div>
    );
};

export default FolderTile;