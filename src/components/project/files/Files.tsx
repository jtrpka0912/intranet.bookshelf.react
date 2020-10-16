// React
import React, { useContext } from 'react';

// Contexts
import { ShelfContext } from '../../../contexts/ShelfContext';
import FileType from '../../../types/File';

// Styles
import './Files.scss';

/**
 * @function Files
 * @summary Files Component
 * @description Show any files currently residing in the SHELF and current folder.
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Files: React.FunctionComponent = () => {
    const { files } = useContext(ShelfContext);

    return (
        <div className="shelf-files">
            {
                files.map((file: FileType) => {
                    return (
                        <div className="shelf-files-placeholder">{ file.name }</div>
                    );
                })    
            }
        </div>
    );
};

export default Files;