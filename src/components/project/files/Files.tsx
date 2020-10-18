// React
import React, { useContext } from 'react';

// Contexts
import { AppContext, ListSections, ListViews } from '../../../contexts/AppContext';
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import FileType from '../../../types/File';

// Components
import ListDisplay from '../../common/list-display/ListDisplay';
import FileItem from '../file-item/FileItem';

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
    const { switchListView } = useContext(AppContext);
    const { files } = useContext(ShelfContext);

    // Only show when there are files to display
    if(files.length > 0) {
        return (
            <div className="shelf-files">
                <div className="shelf-files__list-display">
                    <ListDisplay tile list 
                        onClickTile={ () => switchListView(ListSections.Directory, ListViews.Tile) } 
                        onClickList={ () => switchListView(ListSections.Directory, ListViews.List) }
                    />
                </div>
                {
                    files.map((file: FileType) => {
                        return (
                            <div key={ file._id } className="shelf-files-placeholder">{ file.name }</div>
                        );
                    })    
                }
            </div>
        );
    } else {
        // Do not show files since there are no "files"
        return null;
    }
};

export default Files;