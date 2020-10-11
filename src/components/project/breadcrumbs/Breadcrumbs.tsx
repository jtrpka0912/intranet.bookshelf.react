// React
import React from 'react';

// Components
import FolderTile from '../folder-tile/FolderTile';

// Types
import DirectoryType from '../../../types/Directory';

// Faux Data
import directories from '../../../data/directories';

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
    return (
        <div className="shelf-breadcrumbs">
            { directories.map((directory: DirectoryType) => {
                return (
                    <FolderTile key={ directory._id } directory={ directory} opened={ true } />
                )
            }) }
        </div>
    )
};

export default Breadcrumbs;