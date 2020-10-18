// React
import React, { useContext } from 'react';

// Context
import { AppContext, ListViews, ListSections } from '../../../contexts/AppContext';
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import DirectoryType from '../../../types/Directory';

// Components
import FolderItem from '../folder-item/FolderItem';
import ListDisplay from '../../common/list-display/ListDisplay';

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
    const { directoryView, switchListView } = useContext(AppContext);
    const { directories } = useContext(ShelfContext);

    // Only show when there are directories to display
    if(directories.length > 0) {
        return (
            <div className='shelf-directories'>
                <div className="shelf-directories__list-display">
                    <ListDisplay tile list 
                        onClickTile={ () => switchListView(ListSections.Directory, ListViews.Tile) } 
                        onClickList={ () => switchListView(ListSections.Directory, ListViews.List) }
                    />
                </div>
                
                <div className="shelf-directories__items">
                    { 
                        directories.map((directory: DirectoryType) => {
                            let listViewClass: string = '';

                            if(directoryView === ListViews.Tile) {
                                listViewClass = 'common-item--tile';
                            } else if(directoryView === ListViews.List) {
                                listViewClass = 'common-item--list';
                            } else {
                                // Return nothing
                                return null;
                            }

                            return (
                                <FolderItem key={ directory._id } className={ listViewClass } directory={ directory} opened={ false } />
                            );
                        })
                    }
                </div>
            </div>
        );
    } else {
        // Do not show directories since there are no "directories"
        return null;
    }
};

export default Directories;