// React
import React, { useContext } from 'react';

// Context
import { AppContext, ListViews } from '../../../contexts/AppContext';
import { ShelfContext } from '../../../contexts/ShelfContext';

// Components
import FolderTile from '../folder-tile/FolderTile';
import ListDisplay from '../../common/list-display/ListDisplay';

// Types
import DirectoryType from '../../../types/Directory';

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
    const { directoryView, toggleDirectoryView } = useContext(AppContext);
    const { directories } = useContext(ShelfContext);
    
    // TODO: Make sure this does not get displayed if no items in directories.

    /**
     * @function directoryClasses
     * @description Print out the classes for the directories wrapper element
     * @author J.T.
     * @returns { string }
     */
    const directoryClasses = (): string => {
        let classArray = ['shelf-directories'];

        if(directoryView === ListViews.Tile) {
            classArray.push('tile');
        } else if(directoryView === ListViews.List) {
            classArray.push('list');
        }

        return classArray.join(' ');
    }

    return (
        <div className={ directoryClasses() }>
            <div className="shelf-directories-listdisplay">
                <ListDisplay tile list 
                    onClickTile={ () => toggleDirectoryView(ListViews.Tile) } 
                    onClickList={ () => toggleDirectoryView(ListViews.List) }
                />
            </div>
            
            <div className="shelf-directories-items">
                { 
                    directories.map((directory: DirectoryType) => {
                        if(directoryView === ListViews.Tile) {
                            return (
                                <FolderTile key={ directory._id } directory={ directory} opened={ false } />
                            )
                        } else if(directoryView === ListViews.List) {
                            // TODO: Construct the List Item component
                            return  <div key={ directory._id } className="placeholder">{ directory.name }</div>
                        } else {
                            // Return nothing
                            return null;
                        }
                        
                    }) 
                }
            </div>
        </div>
    )
};

export default Directories;