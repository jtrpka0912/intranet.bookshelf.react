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
import './ListSection.scss';

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

    /**
     * @function viewTypesItemsClass
     * @description Set the view type classes for the group of items
     * @author J.T.
     * @returns { string }
     */
    const viewTypesItemsClass = () => {
        switch(fileView) {
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

    // Only show when there are files to display
    if(files.length > 0) {
        return (
            <div className="shelf-listsections">
                <div className="shelf-listsections__list-display">
                    <ListDisplay tile list 
                        onClickTile={ () => switchListView(ListSections.File, ListViews.Tile) } 
                        onClickList={ () => switchListView(ListSections.File, ListViews.List) }
                    />
                </div>

                <div className={ viewTypesItemsClass() }>
                    {
                        files.map((file: FileType) => {
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