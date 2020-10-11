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
    const { setToActiveFolder } = useContext(ShelfContext);

    const onClickCurrentFolder = () => {
        setToActiveFolder(props.directory);
    }

    // TODO: This will need a click event to set the currentFolder state and populate the SHELF
    return (
        <div className="shelf-foldertile-wrapper">
            <div className="shelf-foldertile-icon" onClick={ onClickCurrentFolder }>
                <FontAwesomeIcon icon={ props.opened ? faFolderOpen : faFolder } />
            </div>

            <h3 className="shelf-foldertile-name">{ props.directory.name }</h3>
        </div>
    );
};

export default FolderTile;