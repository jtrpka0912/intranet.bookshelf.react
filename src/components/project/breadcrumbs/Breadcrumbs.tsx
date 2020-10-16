// React
import React, { useContext } from 'react';

// Components
import FolderTile from '../folder-tile/FolderTile';
import ShelfTile from '../shelf-tile/ShelfTile';

// Types
import DirectoryType from '../../../types/Directory';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

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
    const { activeShelf, breadcrumbs } = useContext(ShelfContext);

    return (
        <div className="shelf-breadcrumbs">
            { // Make sure active shelf is not null, and there is at least one item in the breadcrumbs
                activeShelf !== null && breadcrumbs.length > 0 ? ( <ShelfTile shelf={ activeShelf } /> ) : null 
            }
            
            { breadcrumbs.map((directory: DirectoryType, index: number) => {
                if(index > 0) {
                    return (
                        <FolderTile key={ directory._id } directory={ directory} opened={ true } />
                    )
                }

                return null; // Only there to let the map function not complain
            }) }
        </div>
    )
};

export default Breadcrumbs;