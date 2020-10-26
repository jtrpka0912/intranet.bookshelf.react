// React
import React, { useContext } from 'react';

// Context
import { AppContext, ListViews, ListSections } from '../../contexts/AppContext';
import { ShelfContext } from '../../contexts/ShelfContext';

// Types
import DirectoryType from '../../../types/Directory';

// Components
import FolderItem from '../folder-item/FolderItem';
import ShelfItem from '../shelf-item/ShelfItem';
import ListDisplay from '../../common/list-display/ListDisplay';

/**
 * @function Breadcrumbs
 * @summary Breadcrumb Component
 * @description Show the path that precedes the current folder for the SHELF
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Breadcrumbs: React.FunctionComponent = () => {
    const { breadcrumbView, switchListView } = useContext(AppContext);
    const { activeShelf, activeDirectory, breadcrumbs } = useContext(ShelfContext);

    /**
     * @function viewTypesItemsClass
     * @description Set the view type classes for the group of items
     * @author J.T.
     * @returns { string }
     */
    const viewTypesItemsClass = () => {
        switch(breadcrumbView) {
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

    /**
     * @function renderActiveShelf
     * @description Render the active shelf as the first breadcrumb item if any
     * @author J.T.
     * @returns { React.ReactNode }
     */
    const renderActiveShelf = (): React.ReactNode => {
        // Make sure active shelf and active directory is not null
        if(activeShelf !== null && !activeDirectory !== null) {
            let listViewClass: string = '';

            if(breadcrumbView === ListViews.Tile) {
                listViewClass = 'common-item--tile';
                
            } else if(breadcrumbView === ListViews.Breadcrumb) {
                listViewClass = 'common-item--breadcrumb';
            }

            return <ShelfItem className={ listViewClass } shelf={ activeShelf } />
        }

        return null;
    }

    if(activeDirectory !== null) {
        return (
            <div className="shelf-listsections">
                
                <div className="shelf-listsections__list-display">
                    <ListDisplay tile breadcrumb 
                        isTileActive={ breadcrumbView === ListViews.Tile ? true : false }
                        isBreadcrumbActive={ breadcrumbView === ListViews.Breadcrumb ? true : false }
                        onClickTile={ () => switchListView(ListSections.Breadcrumb, ListViews.Tile) }
                        onClickBreadcrumb={ () => switchListView(ListSections.Breadcrumb, ListViews.Breadcrumb) }
                    />
                </div>
    
                <div className={ viewTypesItemsClass() }>
                    { renderActiveShelf() }
                    
                    { breadcrumbs.map((directory: DirectoryType) => {
                        let listViewClass: string = '';

                        if(breadcrumbView === ListViews.Tile) {
                            listViewClass = 'common-item--tile';
                        } else if(breadcrumbView === ListViews.Breadcrumb) {
                            listViewClass = 'common-item--breadcrumb';
                        }

                        return (
                            <FolderItem key={ directory._id } 
                                className={ listViewClass }
                                directory={ directory} 
                                opened={ true } 
                            />
                        );
                    }) }
                </div>
            </div>
        );
    } else {
        // Do not show breadcrumbs since there are no "breadcrumbs"
        return null;
    }
};

export default Breadcrumbs;