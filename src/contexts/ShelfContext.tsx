// React
import React, { createContext, useState, useEffect } from 'react';

// Types
import ShelfType from '../types/Shelf';
import DirectoryType from '../types/Directory';
import FileType from '../types/File';

/**
 * @type EbookResponse
 * @summary Ebook API Response
 * @description An eBook response from the server
 * @author J.T.
 * @property { DirectoryType[] } breadcrumbs
 * @property { DirectoryType[] } directories
 * @property { FileType[] } files
 */
type EbookResponse = {
    breadcrumbs: DirectoryType[],
    directories: DirectoryType[],
    files: FileType[]
};

/**
 * @type ShelfContextType
 * @summary Shelf Context Type
 * @description Definition of the shelf context type
 * @author J.T.
 * @property { ShelfType[] } shelves
 * @property { DirectoryType[] } breadcrumbs
 * @property { DirectoryType[] } directories
 * @property { FileType[] } files
 * @property { ShelfType | null } activeShelf
 * @property { DirectoryType | null } activeDirectory
 * @property { function } addOneToShelves
 * @property { function } setToActiveShelf
 * @property { function } setToActiveDirectory
 */
type ShelfContextType = {
    // Items
    shelves: ShelfType[],
    breadcrumbs: DirectoryType[],
    directories: DirectoryType[],
    files: FileType[],
    // Status
    activeShelf: ShelfType | null,
    activeDirectory: DirectoryType | null,
    // Actions
    addOneToShelves: (shelf: ShelfType) => void,
    setToActiveShelf: (shelf: ShelfType) => void,
    setToActiveDirectory: (directory: DirectoryType) => void
};

const defaultState: ShelfContextType = {
    // Items
    shelves: [],
    breadcrumbs: [],
    directories: [],
    files: [],
    // Status
    activeShelf: null,
    activeDirectory: null,
    // Actions
    addOneToShelves: addOneToShelves => console.warn('addOneToShelves is not available (check context provider in heirarchy)'),
    setToActiveShelf: setToActiveShelf => console.warn('setToActiveShelf is not available (check context provider in heirarchy)'),
    setToActiveDirectory: setToActiveDirectory => console.warn('setToActiveDirectory is not available (check context provider in heirarchy)')
};

export const ShelfContext: React.Context<ShelfContextType> = createContext<ShelfContextType>(defaultState);

/**
 * @type ShelfContextProps
 * @summary Shelf context props
 * @description Define the structure the shelf context props
 * @author J.T.
 * @property { React.ReactNode } children
 */
type ShelfContextProps = {
    children: React.ReactNode
};

/**
 * @function ShelfContextProvider
 * @summary Shelf Context Provider
 * @description A state managed provider to hold all of the directories and files of the shelf (and current folder).
 * @author J.T.
 * @param { ShelfContextProps } props 
 * @returns { React.ReactNode }
 */
const ShelfContextProvider = (props: ShelfContextProps) => {
    const localStorageActiveShelfName = 'activeShelf';
    const localStorageActiveDirectoryName = 'activeDirectory';

    const [shelves, setShelves] = useState(defaultState.shelves);
    const [breadcrumbs, setBreadcrumbs] = useState(defaultState.breadcrumbs);
    const [directories, setDirectories] = useState(defaultState.directories);
    const [files, setFiles] = useState(defaultState.files);
    const [activeShelf, setActiveShelf] = useState(defaultState.activeShelf);
    const [activeDirectory, setActiveDirectory] = useState(defaultState.activeDirectory);
    
    /**
     * @function addOneToShelves
     * @description Add a shelf to the shelves state.
     * @author J.T.
     * @param {  } shelf 
     */
    const addOneToShelves = (shelf: ShelfType) => {
        setShelves([...shelves, shelf]);
    }

    /**
     * @function setToActiveShelf
     * @description Set a shelf to be the active shelf (and display its items)
     * @author J.T.
     * @param { ShelfType } shelf
     */
    const setToActiveShelf = (shelf: ShelfType) => {
        // Set the active shelf to local storage
        localStorage.setItem(localStorageActiveShelfName, JSON.stringify(shelf));

        // Then set to state
        setActiveShelf(shelf);

        // TODO: Then retrieve the breadcrumbs, directories, and files
        retrieveShelfContents(shelf);
    }

    /**
     * @function setToActiveDirectory
     * @description Set the directory to be the current folder in the active shelf (and display its items)
     * @author J.T.
     * @param { DirectoryType } directory 
     */
    const setToActiveDirectory = (directory: DirectoryType) => {
        console.table(directory);
    }

    /**
     * @async
     * @function retrieveShelfContents
     * @description Retrieve the shelves contents
     * @author J.T.
     * @param { ShelfType } shelf 
     * @param { DirectoryType } directory 
     */
    const retrieveShelfContents = async (shelf: ShelfType, directory?: DirectoryType) => {
        try{
            let api: string = `http://localhost:3001/api/v1/ebooks/shelf/${shelf._id}`;

            // If directory, then add the folder property to the endpoint.
            if(directory) {
                api.concat(`/folder/${directory._id}`);
            }

            const response: Response = await fetch(api);

            if(response.status !== 200 && !response.ok) {
                throw Error('Unable to get response.');
            }

            // Retrieve the data
            const responseJSON: EbookResponse = await response.json();
            console.table(responseJSON.breadcrumbs);
            console.table(responseJSON.directories);
            console.table(responseJSON.files);

            // Check if data is there
            if(responseJSON.breadcrumbs && responseJSON.directories && responseJSON.files) {
                const breadcrumbs: DirectoryType[] = responseJSON.breadcrumbs;
                const directories: DirectoryType[] = responseJSON.directories;
                const files: FileType[] = responseJSON.files;

                setBreadcrumbs(breadcrumbs);
                setDirectories(directories);
                setFiles(files);
            }
        } catch (err) {
            console.error('ShelfContext - retrieveShelfContents()', err);
        }
    };

    useEffect(() => {
        /**
         * @function retrieveLocalStorageActiveShelf
         * @description Retrieve, if any, the last active shelf prior to refreshing
         * @author J.T.
         */
        const retrieveLocalStorageActiveShelf = () => {
            const lastActiveShelfJSON: string | null = localStorage.getItem(localStorageActiveShelfName);

            // Check if there is any value in active shelf
            if(lastActiveShelfJSON) {
                const lastActiveShelf: ShelfType = JSON.parse(lastActiveShelfJSON);
                setToActiveShelf(lastActiveShelf);
            }
        }

        /**
         * @async
         * @function retrieveAvailableShelves
         * @description Retrieve all of the shelves from the database
         * @author J.T.
         * @note Should this be stand alone?
         * @throws Error
         * @returns ShelfType[]
         */
        const retrieveAvailableShelves = async () => {
            const response = await fetch('http://localhost:3001/api/v1/shelves');

            if(response.status !== 200 && !response.ok) {
                throw Error('Unable to retrieve response');
            }

            const responseJSON: any[] = await response.json();
            let shelfArray: ShelfType[] = responseJSON;
            setShelves(shelfArray);
        };
        
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
            activeDirectory,
            addOneToShelves,
            setToActiveShelf,
            setToActiveDirectory
        }}>
            { props.children }
        </ShelfContext.Provider>
    );
};

export default ShelfContextProvider;