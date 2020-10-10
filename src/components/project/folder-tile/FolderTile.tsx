// React
import React from 'react';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

// Styles
import './FolderTile.scss';

/**
 * @function FolderTile
 * @summary Folder Tile Component
 * @description A folder tile represents a directory in the shelf.
 * @return { React.ReactNode }
 */
const FolderTile: React.FunctionComponent = () => {
    // TODO: Retrieve a DirectoryType object as a prop
    // TODO: This will need a click event to set the currentFolder state and populate the SHELF
    // TODO: I would like to have the breadcrumb component to have the open folder icon and the directory component to use the closed folder icon (faFolder)
    return (
        <div className="shelf-foldertile-wrapper">
            <div className="shelf-foldertile-icon">
                <FontAwesomeIcon icon={ faFolderOpen } />
            </div>

            <h3 className="shelf-foldertile-name">Folder</h3>
        </div>
    );
};

export default FolderTile;