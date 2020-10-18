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
    const { switchListView, fileView } = useContext(AppContext);
    const { files } = useContext(ShelfContext);

    // Only show when there are files to display
    if(files.length > 0) {
        return (
            <div className="shelf-files">
                <div className="shelf-files__list-display">
                    <ListDisplay tile list 
                        onClickTile={ () => switchListView(ListSections.File, ListViews.Tile) } 
                        onClickList={ () => switchListView(ListSections.File, ListViews.List) }
                    />
                </div>

                <div className="shelf-files__items">
                    {
                        files.map((file: FileType) => {
                            console.info('File', file);
                            let listViewClass: string = '';

                            if(fileView === ListViews.Tile) {
                                listViewClass = 'common-item--tile';
                            } else if(fileView === ListViews.List) {
                                listViewClass = 'common-item--list';
                            } else {
                                // Return nothing
                                return null;
                            }

                            return (
                                <FileItem key={ file._id }
                                    className={ listViewClass }
                                    file={ file }
                                />
                            );
                        })    
                    }
                </div>
            </div>
        );
    } else {
        // Do not show files since there are no "files"
        return null;
    }
};

export default Files;