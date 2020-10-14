// React
import React, { useContext } from 'react';

// Components
import FolderTile from '../folder-tile/FolderTile';

// Types
import DirectoryType from '../../../types/Directory';

// Styles
import './Breadcrumbs.scss';
import { ShelfContext } from '../../../contexts/ShelfContext';


/**
 * @function Breadcrumbs
 * @summary Breadcrumb Component
 * @description Show the path that precedes the current folder for the SHELF
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Breadcrumbs: React.FunctionComponent = () => {
    const { breadcrumbs } = useContext(ShelfContext);

    return (
        <div className="shelf-breadcrumbs">
            { breadcrumbs.map((directory: DirectoryType, index: number) => {
                if(index > 0) {
                    return (
                        <FolderTile key={ directory._id } directory={ directory} opened={ true } />
                    )
                } else {
                    // TODO: Need to figure out what to do with the first item (Shelf item)
                    return null;
                }
                
            }) }
        </div>
    )
};

export default Breadcrumbs;