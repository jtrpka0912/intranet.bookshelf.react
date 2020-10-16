// React
import React, { useContext } from 'react';

// Components
import Tile from '../../common/tile/Tile';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import DirectoryType from '../../../types/Directory';

// Font Awesome
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
        <Tile baseClass="shelf-tile-folder" 
            icon={ props.opened ? faFolderOpen : faFolder }    
            onClick={ onClickCurrentDirectory }
        >{ props.directory.name }</Tile>
    )
};

export default FolderTile;