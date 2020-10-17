// React
import React, { useContext } from 'react';

// Context
import { AppContext, ListViews } from '../../../contexts/AppContext';
import { ShelfContext } from '../../../contexts/ShelfContext';

// Types
import DirectoryType from '../../../types/Directory';

// Components
import FolderTile from '../folder-tile/FolderTile';
import ShelfTile from '../shelf-tile/ShelfTile';
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

    // TODO: Make sure this does not get displayed if no items in breadcrumbs.

    /**
     * @function breadcrumbsItemsClass
     * @description Print out the classes for the breadcrumbs items element
     * @author J.T.
     * @returns { string }
     */
    const breadcrumbsItemsClass = (): string => {
        const baseClass: string = 'shelf-breadcrumbs__items';
        let classArray: string[] = [baseClass];

        if(breadcrumbView === ListViews.Tile) {
            classArray.push(baseClass + '--tile')
        } else if(breadcrumbView === ListViews.Breadcrumb) {
            classArray.push(baseClass + '--breadcrumb')
        }

        return classArray.join(' ');
    }

    return (
        <div className="shelf-breadcrumbs">
            <div className="shelf-breadcrumbs__list-display">
                <ListDisplay tile breadcrumb 
                    onClickTile={ toggleBreadcrumbView(ListViews.Tile) }
                    onClickBreadcrumb={ toggleBreadcrumbView(ListViews.Breadcrumb) }
                />
            </div>

            <div className={ breadcrumbsItemsClass() }>
                { // TODO: Make sure to swap the listview for shelf item
                // Make sure active shelf is not null, and there is at least one item in the breadcrumbs
                    activeShelf !== null && breadcrumbs.length > 0 ? ( <ShelfTile shelf={ activeShelf } /> ) : null 
                }
                
                { breadcrumbs.map((directory: DirectoryType, index: number) => {
                    if(index > 0) {
                        if(breadcrumbView === ListViews.Tile) {
                            return (
                                <FolderTile key={ directory._id } directory={ directory} opened={ true } />
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
    )
};

export default Breadcrumbs;