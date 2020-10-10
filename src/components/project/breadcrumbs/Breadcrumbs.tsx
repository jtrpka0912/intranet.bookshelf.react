// React
import React from 'react';

// Components
import FolderTile from '../folder-tile/FolderTile';

// Styles
import './Breadcrumbs.scss';

/**
 * @function Breadcrumbs
 * @summary Breadcrumb Component
 * @description Show the path that precedes the current folder for the SHELF
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Breadcrumbs: React.FunctionComponent = () => {
    // TODO: Flag the FolderTile's icon prop to open
    return (
        <div className="shelf-breadcrumbs">
            { /* TODO: This will need to be mapped and generate the folder tiles from an array of DirectoryType objects */ }
            <FolderTile />
            <FolderTile />
            <FolderTile />
            <FolderTile />
            <FolderTile />
            <FolderTile />
            <FolderTile />
            <FolderTile />
            <FolderTile />
            <FolderTile />
        </div>
    )
};

export default Breadcrumbs;