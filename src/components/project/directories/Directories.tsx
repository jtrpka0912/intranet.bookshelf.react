// React
import React, { useContext } from 'react';

// Context
import { AppContext, ListViews } from '../../../contexts/AppContext';
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
    // TODO: Use directoryView to toggle the directories map function
    // TODO: Figure out how to add the ListViews enum inside the toggleDirectoryView (and the other two)
    const { directoryView, toggleDirectoryView } = useContext(AppContext);
    const { directories } = useContext(ShelfContext);
    
    // TODO: Make sure this does not get displayed if no items in directories.

    return (
        <div className="shelf-directories">
            <div className="shelf-directories-listdisplay">
                <ListDisplay tile list />
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