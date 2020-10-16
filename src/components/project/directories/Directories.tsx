// React
import React, { useContext } from 'react';

// Components
import FolderTile from '../folder-tile/FolderTile';

// Types
import DirectoryType from '../../../types/Directory';

// Styles
import './Directories.scss';
import { ShelfContext } from '../../../contexts/ShelfContext';


/**
 * @function Directories
 * @summary Directories Component
 * @description Show any directories currently residing in the SHELF and current folder.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Directories: React.FunctionComponent = () => {
    const { directories } = useContext(ShelfContext);

    return (
        <div className="shelf-directories">
            { 
                directories.map((directory: DirectoryType) => {
                    return (
                        <FolderTile key={ directory._id } directory={ directory} opened={ false } />
                    )
                }) 
            }
        </div>
    )
};

export default Directories;