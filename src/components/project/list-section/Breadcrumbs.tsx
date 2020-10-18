// React
import React, { useContext } from 'react';

// Context
import { AppContext, ListViews, ListSections } from '../../../contexts/AppContext';
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import DirectoryType from '../../../types/Directory';

// Components
import FolderItem from '../folder-item/FolderItem';
import ShelfItem from '../shelf-item/ShelfItem';
import ListDisplay from '../../common/list-display/ListDisplay';

// Styles
import './ListSection.scss';

/**
 * @function Breadcrumbs
 * @summary Breadcrumb Component
 * @description Show the path that precedes the current folder for the SHELF
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Breadcrumbs: React.FunctionComponent = () => {
    const { breadcrumbView, switchListView } = useContext(AppContext);
    const { activeShelf, breadcrumbs } = useContext(ShelfContext);

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
        // Make sure active shelf is not null, and there is at least one item in the breadcrumbs
        if(activeShelf !== null && breadcrumbs.length > 0 ) {
            let listViewClass: string = '';

            if(breadcrumbView === ListViews.Tile) {
                listViewClass = 'common-item--tile';
                
            } else if(breadcrumbView === ListViews.Breadcrumb) {
                listViewClass = 'common-item--breadcrumb';
                // TODO: Might have to do something different for breadcrumbs
                // return <div>{ activeShelf.name }</div>
            }

            return <ShelfItem className={ listViewClass } shelf={ activeShelf } />
        }

        return null;
    }

    if(breadcrumbs.length > 0) {
        return (
            <div className="shelf-listsections">
                
                <div className="shelf-listsections__list-display">
                    <ListDisplay tile breadcrumb 
                        onClickTile={ () => switchListView(ListSections.Breadcrumb, ListViews.Tile) }
                        onClickBreadcrumb={ () => switchListView(ListSections.Breadcrumb, ListViews.Breadcrumb) }
                    />
                </div>
    
                <div className={ viewTypesItemsClass() }>
                    { renderActiveShelf() }
                    
                    { breadcrumbs.map((directory: DirectoryType, index: number) => {
                        if(index > 0) {
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
                        }
    
                        return null; // Only there to let the map function not complain
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