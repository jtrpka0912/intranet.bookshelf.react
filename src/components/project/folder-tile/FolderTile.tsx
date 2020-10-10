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
    return (
        <div className="shelf-foldertile-wrapper">
            <div className="shelf-foldertile-icon">
                <FontAwesomeIcon icon={ faFolderOpen } />
            </div>

            <h3 className="shelf-foldertile-name">Stupid long name for a tile.</h3>
        </div>
    );
};

export default FolderTile;