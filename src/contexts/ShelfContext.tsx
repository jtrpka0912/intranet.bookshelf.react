// React
import React, { createContext, useState, useEffect } from 'react';

// Types
import ShelfType from '../types/Shelf';
import DirectoryType from '../types/Directory';
import FileType from '../types/File';

/**
 * @type ShelfContextType
 * @summary Shelf Context Type
 * @description Definition of the shelf context type
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { DirectoryType[] } breadcrumbs
 * @property { DirectoryType[] } directories
 * @property { FileType[] } files
 */
type ShelfContextType = {
    // Items
    shelves: ShelfType[],
    breadcrumbs: DirectoryType[],
    directories: DirectoryType[],
    files: FileType[],
    // Status
    activeShelf: ShelfType | null,
    activeFolder: DirectoryType | null,
    // Actions
    addOneToShelves: (shelf: ShelfType) => void,
    setToActiveShelf: (shelf: ShelfType) => void
};

const defaultState: ShelfContextType = {
    // Items
    shelves: [],
    breadcrumbs: [],
    directories: [],
    files: [],
    // Status
    activeShelf: null,
    activeFolder: null,
    // Actions
    addOneToShelves: addOneToShelves => console.warn('addOneToShelves is not available (check context provider in heirarchy)'),
    setToActiveShelf: setToActiveShelf => console.warn('setToActiveShelf is not available (check context provider in heirarchy)')
};

export const ShelfContext: React.Context<ShelfContextType> = createContext<ShelfContextType>(defaultState);

/**
 * @type ShelfContextProps
 * @summary Shelf context props
 * @description Define the structure the shelf context props
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @property { React.ReactNode } children
 */
type ShelfContextProps = {
    children: React.ReactNode
};

/**
 * @function ShelfContextProvider
 * @summary Shelf Context Provider
 * @description A state managed provider to hold all of the directories and files of the shelf (and current folder).
 * @author J. Trpka <jtrpka0912@gmail.com>
 * @param { ShelfContextProps } props 
 * @returns { JSX }
 */
const ShelfContextProvider = (props: ShelfContextProps) => {
    const localStorageActiveShelfName = 'activeShelf';

    const [shelves, setShelves] = useState(defaultState.shelves);
    const [breadcrumbs, setBreadcrumbs] = useState(defaultState.breadcrumbs);
    const [directories, setDirectories] = useState(defaultState.directories);
    const [files, setFiles] = useState(defaultState.files);
    const [activeShelf, setActiveShelf] = useState(defaultState.activeShelf);
    const [activeFolder, setActiveFolder] = useState(defaultState.activeFolder);
    

    const addOneToShelves = (shelf: ShelfType) => {
        setShelves([...shelves, shelf]);
    }

    /**
     * @function setToActiveShelf
     * @event onClick
     * @description Set a shelf to be the active shelf (and display its items)
     * @author J. Trpka <jtrpka0912@gmail.com>
     * @param { ShelfType } shelf
     */
    const setToActiveShelf = (shelf: ShelfType) => {
        localStorage.setItem(localStorageActiveShelfName, JSON.stringify(shelf));
        setActiveShelf(shelf);

        // TODO: Then retrieve the breadcrumbs, directories, and files
    }

    useEffect(() => {
        /**
         * @function retrieveLocalStorageActiveShelf
         * @description Retrieve, if any, the last active shelf prior to refreshing
         * @author J. Trpka <jtrpka0912@gmail.com>
         */
        const retrieveLocalStorageActiveShelf = () => {
            const lastActiveShelfJSON: string | null = localStorage.getItem(localStorageActiveShelfName);

            if(lastActiveShelfJSON) {
                const lastActiveShelf: ShelfType = JSON.parse(lastActiveShelfJSON);
                setActiveShelf(lastActiveShelf);
            }
        }

        /**
         * @async
         * @function retrieveAvailableShelves
         * @description Retrieve all of the shelves from the database
         * @author J. Trpka <jtrpka0912@gmail.com>
         * @throws Error
         * @returns ShelfType[]
         */
        const retrieveAvailableShelves = async () => {
            const response = await fetch('http://localhost:3001/api/v1/shelves');

            if(response.status !== 200 && !response.ok) {
                throw Error('Unable to retrieve response');
            }

            const responseJSON: any[] = await response.json();

            // TODO: Need a better way to map the data
            let shelfArray: ShelfType[] = [];
            
            for(let shelfData of responseJSON) {
                let shelf: ShelfType = {
                    _id: shelfData._id,
                    name: shelfData.name,
                    root: shelfData.root,
                    showDirectories: shelfData.showDirectories,
                    multiFile: shelfData.multiFile
                };

                shelfArray.push(shelf);
            }
            
            setShelves(shelfArray);
        };

        // TODO: Add function to handle retrieving last active shelf from localStorage
        
        try {
            retrieveLocalStorageActiveShelf();
            retrieveAvailableShelves();
        } catch(err) {
            console.error('AppContext useEffect', err);
        }
    }, []); // Pass any variables that useEffect should check each time the component gets re-rendered.

    return (
        <ShelfContext.Provider value={{ 
            shelves, 
            breadcrumbs, 
            directories, 
            files,
            activeShelf,
            activeFolder,
            addOneToShelves,
            setToActiveShelf
        }}>
            { props.children }
        </ShelfContext.Provider>
    );
};

export default ShelfContextProvider;