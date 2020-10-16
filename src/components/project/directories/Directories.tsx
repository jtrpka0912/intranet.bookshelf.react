// React
import React, { useContext } from 'react';

// Context
import { ShelfContext } from '../../../contexts/ShelfContext';

// Components
import FolderTile from '../folder-tile/FolderTile';
import ListDisplay from '../../common/list-display/ListDisplay';

// Types
import DirectoryType from '../../../types/Directory';

// Styles
import './Directories.scss';

/**
 * @function Directories
 * @summary Directories Component
 * @description Show any directories currently residing in the SHELF and current folder.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Directories: React.FunctionComponent = () => {
    const { directories } = useContext(ShelfContext);

    // TODO: Make sure this does not get displayed if no items in directories.

    return (
        <div className="shelf-directories">
            <div className="shelf-directories-listdisplay">
                <ListDisplay />
            </div>
            
            <div className="shelf-directories-items">
                { 
                    directories.map((directory: DirectoryType) => {
                        return (
                            <FolderTile key={ directory._id } directory={ directory} opened={ false } />
                        )
                    }) 
                }
            </div>
        </div>
    )
};

export default Directories;