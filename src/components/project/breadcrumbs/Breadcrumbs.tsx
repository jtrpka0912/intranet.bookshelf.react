// React
import React, { useContext } from 'react';

// Context
import { AppContext, ListViews } from '../../../contexts/AppContext';
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import DirectoryType from '../../../types/Directory';

// Components
import FolderItem from '../folder-item/FolderItem';
import ShelfItem from '../shelf-item/ShelfItem';
import ListDisplay from '../../common/list-display/ListDisplay';

// Styles
import './Breadcrumbs.scss';

/**
 * @function Breadcrumbs
 * @summary Breadcrumb Component
 * @description Show the path that precedes the current folder for the SHELF
 * @author J.T.
 * @returns { React.ReactNode }
 */
const Breadcrumbs: React.FunctionComponent = () => {
    const { breadcrumbView, toggleBreadcrumbView } = useContext(AppContext);
    const { activeShelf, breadcrumbs } = useContext(ShelfContext);

    /**
     * @function renderActiveShelf
     * @description Render the active shelf as the first breadcrumb item if any
     * @author J.T.
     * @returns { React.ReactNode }
     */
    const renderActiveShelf = (): React.ReactNode => {
        // Make sure active shelf is not null, and there is at least one item in the breadcrumbs
        if(activeShelf !== null && breadcrumbs.length > 0 ) {
            if(breadcrumbView === ListViews.Tile) {
                return <ShelfItem className="common-item--tile" shelf={ activeShelf } />
            } else if(breadcrumbView === ListViews.Breadcrumb) {
                // TODO: Might have to do something different for breadcrumbs
                return <div>{ activeShelf.name }</div>
            }
        }

        return null;
    }

    if(breadcrumbs.length > 0) {
        return (
            <div className="shelf-breadcrumbs">
                
                <div className="shelf-breadcrumbs__list-display">
                    <ListDisplay tile breadcrumb 
                        onClickTile={ () => toggleBreadcrumbView(ListViews.Tile) }
                        onClickBreadcrumb={ () => toggleBreadcrumbView(ListViews.Breadcrumb) }
                    />
                </div>
    
                <div className="shelf-breadcrumbs__items">
                    { renderActiveShelf() }
                    
                    { breadcrumbs.map((directory: DirectoryType, index: number) => {
                        if(index > 0) {
                            if(breadcrumbView === ListViews.Tile) {
                                return (
                                    <FolderItem key={ directory._id } 
                                        className="common-item--tile"
                                        directory={ directory} 
                                        opened={ true } 
                                    />
                                )
                            } else if(breadcrumbView === ListViews.Breadcrumb) {
                                // TODO: Might have to do something different on how to display tile versus breadcrumbs
                                return null;
                            }
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