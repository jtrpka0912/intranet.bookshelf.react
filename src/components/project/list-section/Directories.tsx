// React
import React, { useContext } from 'react';

// Context
import { AppContext, ListViews, ListSections } from '../../contexts/AppContext';
import { ShelfContext } from '../../contexts/ShelfContext';

// Types
import DirectoryType from '../../../types/Directory';

// Components
import FolderItem from '../folder-item/FolderItem';
import ListDisplay from '../../common/list-display/ListDisplay';

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

    /**
     * @function viewTypesItemsClass
     * @description Set the view type classes for the group of items
     * @author J.T.
     * @returns { string }
     */
    const viewTypesItemsClass = () => {
        switch(directoryView) {
            case ListViews.Breadcrumb: 
                return 'shelf-listsections__items shelf-listsections__items--breadcrumb';
            case ListViews.List: 
                return 'shelf-listsections__items shelf-listsections__items--list';
            case ListViews.Tile: 
                return 'shelf-listsections__items shelf-listsections__items--tile';
            default:
                return '';
        };
    }

    // Only show when there are directories to display
    if(directories.length > 0) {
        return (
            <div className='shelf-listsections'>
                <div className="shelf-listsections__list-display">
                    <ListDisplay tile list 
                        isTileActive={ directoryView === ListViews.Tile ? true : false }
                        isListActive={ directoryView === ListViews.List ? true : false }
                        onClickTile={ () => switchListView(ListSections.Directory, ListViews.Tile) } 
                        onClickList={ () => switchListView(ListSections.Directory, ListViews.List) }
                    />
                </div>
                
                <div className={ viewTypesItemsClass() }>
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
                                <FolderItem key={ directory._id } 
                                    className={ listViewClass } 
                                    directory={ directory} 
                                    opened={ false } 
                                />
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